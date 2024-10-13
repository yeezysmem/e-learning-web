"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Question } from "@prisma/client";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";


interface SurveyFormProps {
  id: number;
  text: string;
  isCorrect: boolean;
  initialData: Question;
  courseId: string;
  chapterId: string;

}

const SurveyForm = ({courseId,chapterId, initialData} : SurveyFormProps) => {
  const [question, setQuestion] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formCount, setFormCount] = useState(1);
  const handleAddForm = () => {
    setFormCount(formCount + 1);
  };
  const formSchema = z.object({
    taskCriteria: z.string().min(1),
  });

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);


  const [options, setOptions] = useState<{ id: string; text: string; isCorrect: boolean }[]>(
    initialData
      ? [
          {
            id: initialData.id,
            text: initialData.option,
            isCorrect: initialData.isCorrect,
          },
        ]
      : []
  );
  const MAX_OPTIONS = 3; // Максимальное количество опций
  const surveyJson = {
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  };

  // const router = useRouter();



  const handleOptionChange = (id: number, value: string) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, text: value } : option
    );
    setOptions(updatedOptions);
  };
  // const onSubmit = async () => {
  //   try {
  //     // Создаем массив объектов вопросов и ответов
  //     const questions = options.map(option => ({
  //       id: option.id,
  //       question: question,
  //       option: option.text,
  //       isCorrect: option.isCorrect,
  //       chapterId: chapterId, // Используем chapterId из пропсов
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     }));
  
  //     // Отправляем запрос на сервер
  //     await axios.patch(
  //       `/api/courses/${courseId}/chapters/${chapterId}`,
  //       { 
  //         questions: questions
  //       }
  //     );
  //     toast.success("Final exam selected");
  //     // Дополнительные действия после успешной отправки данных
  //   } catch {
  //     toast.error("Something went wrong");
  //   }
  // };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter updated");
      toggleEdit();
      // router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskCriteria: initialData?.question || ""
    },
  });
  

  const handleCheckboxChange = (id: number) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, isCorrect: !option.isCorrect } : option
    );
    setOptions(updatedOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Further logic to send data to the server or process it within the application
  };

  const { isSubmitting, isValid } = form.formState;
 

  const handleAddQuestion = (question: string, option: string, isCorrect: boolean) => {
    const newQuestion: Question = {
      id: String(questions.length + 1),
      question,
      option,
      isCorrect,
      chapterId: "", // Замените на нужное значение
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleAddOption = (index: number) => {
    if (options.length < MAX_OPTIONS) {
      const newOption: SurveyFormProps = {
        id: options.length + 1,
        text: "",
        isCorrect: false,
      };
      const updatedOptions = [...options];
      updatedOptions[index] = newOption;
      setOptions(updatedOptions);
    } else {
      // Якщо досягнуто максимальний ліміт, вивести повідомлення про помилку або попередження
      toast.error("Досягнуто максимальної кількості варіантів");
    }
  };
  

  return (
  //  <div>
  //     {[...Array(formCount)].map((_, index) => (
  //       <Form key={index} onSubmit={handleSubmit}>
  //         <div>
  //           <label htmlFor={`question-${index}`}>Question:</label>
  //           <Input
  //             type="text"
  //             id={`question-${index}`}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor={`option-${index}`}>Option:</label>
  //           <Input
  //             type="text"
  //             id={`option-${index}`}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor={`option-${index}`}>Option:</label>
  //           <Input
  //             type="text"
  //             id={`option-${index}`}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor={`option-${index}`}>Option:</label>
  //           <Input
  //             type="text"
  //             id={`option-${index}`}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>
  //             <input
  //               type="checkbox"
  //               id={`isCorrect-${index}`}
  //             />
  //             Is Correct
  //           </label>
  //         </div>
  //         <Button onClick={onSubmit}>Submit</Button>
  //       </Form>
  //     ))}
  //     <Button type="button" onClick={handleAddForm}>
  //       Add Form
  //     </Button>
  //   </div>
  <div className="mt-6 border bg-white rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
       <span className="font-bold">Task Criteria</span>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit taskCriteria
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.question && "text-slate-500 italic"
        )}>
          {!initialData.question && "No question"}
          {initialData.question && (
            <Preview
              value={initialData.question}
            />
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SurveyForm;
