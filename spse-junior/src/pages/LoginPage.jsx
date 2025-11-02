import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./form.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const handleSubmit = (e) =>{
    console.log("loloololol")
  }

  return (
    <Form
      className="h-130 w-120 pt-5 pl-20 pr-20  pb-10 rounded-4xl shadow-2xl bg-amber-50"
      onSubmit={handleSubmit}
    >
      <Form.Group className="flex flex-column pb-6">
        <Form.Label className="font-bold text-2xl"> Prihlásenie</Form.Label>
        <Form.Label>Prihlás sa na pokračovanie</Form.Label>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Zadajte svoj email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Heslo</Form.Label>
        <Form.Control type="password" placeholder="Zadajte svoje heslo" />
      </Form.Group>

      <Form.Group className="text-center">
        <Form.Label className="pt-3 p-">
          Nemáš účet? <Link to="/register" className="">Registruj sa tu</Link>
        </Form.Label>
      </Form.Group>

      <Form.Group className="text-center pt-20">
        <Button variant="primary" type="submit">
          Prihlásiť sa
        </Button>
      </Form.Group>
    </Form>
  );
}

export default LoginPage;
