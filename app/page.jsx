'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const page = () => {
  const [books,setBooks] = useState([])
  const [form,setForm]= useState({
    title:'',
    description:'',
    author:''
  })
  
  const handleChange =(e)=>{
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok!.');
      }
      const data = await response.json();
      setBooks([...books, data]);
      setForm({
        title: '',
        description: '',
        author: ''
      });

    } catch (error) {
      console.error('Error creating booking:', error);
    }
  }

useEffect(()=>{
  const fetchData = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  fetchData();
}, []);

// const currentTime = new Date().toLocaleString();
  return (
    <>
    <div className="header shadow-md shadow-gray-200 p-4 text-2xl text-center font-semibold text-blue-600">
      Booking
    </div>
    <div className="container mx-auto p-4">
      
      <Dialog className='max-w-2xl mx-auto mt-10 '>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-blue-600 hover:bg-blue-700 text-white hover:scale-125 hover:text-white cursor-pointer'>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new Booking!</DialogTitle>
            <DialogDescription>
              Make changes to your booking here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="title" placeholder="Enter title" value={form.title} onChange={handleChange} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input id="username-1" name="description" placeholder="Enter description" value={form.description} onChange={handleChange} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-1">Author</Label>
              <Input id="email-1" name="author" placeholder="Enter author" value={form.author} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
<Table>
      <TableCaption>A list of your recent booking.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>author</TableHead>
          <TableHead className="text-right">Date and time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id}>
            <TableCell className="font-medium">{book.title}</TableCell>
            <TableCell>{book.description}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell className="text-right">{new Date(book.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{books.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
    </>
  )
}

export default page