import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status:401 });
        }

        if (isGroup && (!members || members.length < 2  || !name)) {
            return new NextResponse('Invalid Data', { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            });

            // Update all connections with new conversation
            newConversation.users.forEach((user) => {
                if (user.email) {
                pusherServer.trigger(user.email, 'conversation:new', newConversation);
                }
            });

            return NextResponse.json(newConversation);
        }

        const existingConverstaions = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        });

        const singleConverstaion = existingConverstaions[0];

        if (singleConverstaion) {
            return NextResponse.json(singleConverstaion);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        // Update all connections with new conversation
        newConversation.users.forEach((user) => {
            if (user.email) {
            pusherServer.trigger(user.email, 'conversation:new', newConversation);
            }
        });

        return NextResponse.json(newConversation);

    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}