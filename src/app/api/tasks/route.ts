import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

// GET /api/tasks
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(req.url);
    const projectId = url.searchParams.get('projectId');
    const status = url.searchParams.get('status');
    
    const filters: any = {
      userId: session.user.id,
    };
    
    if (projectId) {
      filters.projectId = projectId;
    }
    
    if (status) {
      filters.status = status;
    }
    
    const tasks = await prisma.task.findMany({
      where: filters,
      include: {
        project: true,
        tags: true,
        subtasks: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
    
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/tasks
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    const { title, description, status, priority, dueDate, projectId, tags, subtasks } = body;
    
    // Create task and associated tags and subtasks in a transaction
    const task = await prisma.$transaction(async (tx) => {
      // Create task
      const newTask = await tx.task.create({
        data: {
          title,
          description,
          status: status || 'TODO',
          priority: priority || 'MEDIUM',
          dueDate: dueDate ? new Date(dueDate) : null,
          projectId: projectId || null,
          userId: session.user.id,
        },
      });
      
      // Create tags if provided
      if (tags && tags.length > 0) {
        await tx.tag.createMany({
          data: tags.map((tag: { name: string; color: string }) => ({
            name: tag.name,
            color: tag.color,
            taskId: newTask.id,
          })),
        });
      }
      
      // Create subtasks if provided
      if (subtasks && subtasks.length > 0) {
        await tx.subtask.createMany({
          data: subtasks.map((subtask: { title: string; completed: boolean }) => ({
            title: subtask.title,
            completed: subtask.completed || false,
            taskId: newTask.id,
          })),
        });
      }
      
      // Return task with related data
      return tx.task.findUnique({
        where: { id: newTask.id },
        include: {
          project: true,
          tags: true,
          subtasks: true,
        },
      });
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 