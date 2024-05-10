import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface QuestionFormProps {
  onSubmit: (question: string, option: string, isCorrect: boolean) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(question, option, isCorrect);
    setQuestion("");
    setOption("");
    setIsCorrect(false);
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
      <div>
        <label htmlFor="option">Option:</label>
        <Input
          type="text"
          id="option"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isCorrect}
            onChange={() => setIsCorrect(!isCorrect)}
          />
          Is Correct
        </label>
      </div>
      <Button type="submit">Add Question</Button>
    </Form>
  );
};

export default QuestionForm;
