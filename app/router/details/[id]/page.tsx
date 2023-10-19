"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import useContacts from "@/app/contacts-api/useContacts";

export default function ContactDetails() {
  const { contacts, loading } = useContacts();
  const { id } = useParams();

  // const contactToShow = contacts.find((contact) => {
  //   contact.id === id;
  // });

  // console.log("Contacto para mostrar:", contactToShow);
  console.log("Id del root", id);
  console.log("Contacts", contacts);

  return (
    <div>
      {loading ? (
        <div className="justify-self-center ...">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        // <Card sx={{ maxWidth: 345 }}>
        //   <CardContent>
        //     <Typography gutterBottom variant="h5" component="div">
        //       {contactToShow?.name}
        //       Root id: {id}
        //     </Typography>
        //     <Typography variant="body2" color="text.secondary">
        //       Phone: {contactToShow?.phone}
        //       Email: {contactToShow?.email}
        //     </Typography>
        //   </CardContent>
        //   <CardActions>
        //     <Button size="small">Edit</Button>
        //     <Button size="small">Delete</Button>
        //   </CardActions>
        // </Card>
        <div>
          <h1>{id}</h1>
          {/* <h1>{contactToShow?.name}</h1>
          <h1>{contactToShow?.email}</h1>
          <h1>{contactToShow?.phone}</h1> */}
        </div>
      )}
    </div>
  );
}
