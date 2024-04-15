"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

const SurveyForm: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: false }, // Initial value - one empty option
  ]);




  const handleOptionChange = (id: number, value: string) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, text: value } : option
    );
    setOptions(updatedOptions);
  };

  const handleCheckboxChange = (id: number) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, isCorrect: !option.isCorrect } : option
    );
    setOptions(updatedOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Question:", question);
    console.log("Options:", options);
    // Further logic to send data to the server or process it within the application
  };

  const handleAddOption = () => {
    const newOption: Option = {
      id: options.length + 1,
      text: "",
      isCorrect: false,
    };
    setOptions([...options, newOption]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="question">Question:</label>
        <Input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-1">
        <label>Choose correct answers:</label>
        {options.map((option) => (
          <div key={option.id}>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                required
              />
              <label>
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={() => handleCheckboxChange(option.id)}
                />
                Is Correct
              </label>
            </div>
          </div>
        ))}
        <Button type="button" onClick={handleAddOption}>
          Add Option
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};

export default SurveyForm;
