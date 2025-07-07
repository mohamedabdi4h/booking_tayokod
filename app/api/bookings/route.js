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


export async function UPDATE(req){
    const { id, title, description, author } = await req.json();
    try {
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { title, description, author }
        });
        return NextResponse.json(updatedBooking);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}

// Delete
export async function DELETE(id){
    try {
        const bookingId = id.params.id; // Extracting the ID from the request parameters
        const deletedBooking = await prisma.booking.delete({
            where: { id: bookingId }
        });
        return NextResponse.json(deletedBooking);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
    }
}