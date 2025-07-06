import prisma  from '@/lib/prisma';
import {NextResponse} from 'next/server'
export async function GET() {
    try {
        const bookings = await prisma.booking.findMany();
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(req) {
    const { title, description, author } = await req.json();
    try {
        const newBooking = await prisma.booking.create({
            data: {
                title,
                description,
                author
            }
        });
        return NextResponse.json(newBooking, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}