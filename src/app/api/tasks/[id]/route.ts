import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '../../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET /api/tasks/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const taskId = params.id;
    
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        project: true,
        tags: true,
        subtasks: true,
        attachments: true,
      },
    });
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/tasks/[id]
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const taskId = params.id;
    const body = await req.json();
    
    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    
    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    // Extract data from body
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      order,
      tags,
      subtasks,
    } = body;
    
    // Update task and related data in a transaction
    const updatedTask = await prisma.$transaction(async (prisma) => {
      // Update basic task info
      const task = await prisma.task.update({
        where: { id: taskId },
        data: {
          title: title !== undefined ? title : undefined,
          description: description !== undefined ? description : undefined,
          status: status !== undefined ? status : undefined,
          priority: priority !== undefined ? priority : undefined,
          dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : undefined,
          projectId: projectId !== undefined ? projectId : undefined,
          order: order !== undefined ? order : undefined,
        },
      });
      
      // Update tags if provided
      if (tags !== undefined) {
        // Delete existing tags
        await prisma.tag.deleteMany({
          where: { taskId },
        });
        
        // Create new tags
        if (tags.length > 0) {
          await prisma.tag.createMany({
            data: tags.map((tag: { name: string; color: string }) => ({
              name: tag.name,
              color: tag.color,
              taskId,
            })),
          });
        }
      }
      
      // Update subtasks if provided
      if (subtasks !== undefined) {
        // Delete existing subtasks
        await prisma.subtask.deleteMany({
          where: { taskId },
        });
        
        // Create new subtasks
        if (subtasks.length > 0) {
          await prisma.subtask.createMany({
            data: subtasks.map((subtask: { title: string; completed: boolean }) => ({
              title: subtask.title,
              completed: subtask.completed || false,
              taskId,
            })),
          });
        }
      }
      
      // Return updated task with related data
      return prisma.task.findUnique({
        where: { id: taskId },
        include: {
          project: true,
          tags: true,
          subtasks: true,
          attachments: true,
        },
      });
    });
    
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/tasks/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const taskId = params.id;
    
    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    
    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    // Delete task (related records will be deleted via cascade)
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 