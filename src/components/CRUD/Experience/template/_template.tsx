"use client";

import { DatePicker } from "@/components/common/date-picker";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { cn } from "@/utils";
import { ExperienceSchema } from "@/validators/experience.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

export interface CEExperienceProps {
  title?: string;
  id?: string | null;
  buttonText?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Project {
  id: number;
  name: string;
  url: string;
  description: string;
  duration: number;
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "",
    url: "",
    description: "",
    duration: 3,
  },
];

export const CEExperience: React.FC<CEExperienceProps> = (props) => {
  const [formData, setFormData] = React.useState<
    z.infer<typeof ExperienceSchema>
  >({
    company: "",
    description: "",
    start: new Date(), // Mandatory
    end: undefined, // Optional,
  });
  const [isPending, startTransition] = React.useTransition();
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const pageTitle = `${props.title} Experience`;
  const pageButtonText = props.buttonText ? props.buttonText : "Save";

  // tRPC context
  const ctx = api.useContext();

  // tRPC Query
  const experience = props.id
    ? api.experience.getById.useQuery({ id: props.id })
    : null;

  // tRPC Mutation
  const { mutate: createExperience, isLoading } =
    api.experience.create.useMutation({
      onSuccess: async () => {
        await ctx.experience.invalidate();
        toast({
          title: "Successfully created the Experience",
        });
      },
      onError: () => {
        toast({
          title: "Something went wrong, while creating the Experience",
        });
      },
    });

  const form = useForm<z.infer<typeof ExperienceSchema>>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      company: formData.company,
      description: formData.description,
      start: formData.start,
      end: formData.end,
    },
  });

  const onSubmit = (values: z.infer<typeof ExperienceSchema>) => {
    // Calling the Server Actions
    startTransition(async () => {
      // First formating the projects:
      const formatedProjects = projects.map((project: Project) => ({
        name: project.name,
        url: project.url,
        description: project.description,
        duration: project.duration,
      }));

      // Create a new experience
      createExperience({
        company: values.company,
        description: values.description,
        start: values.start,
        projects: formatedProjects,
        end: values.end,
      });
    });
  };

  const addNewProject = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        id: prevProjects.length + 1,
        name: "",
        url: "",
        description: "",
        duration: 3,
      },
    ]);
  };

  const renderProjects = (project: Project) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      projectId: number,
    ) => {
      e.preventDefault();
      const { name, value } = e.target;
      setProjects((prev) => {
        const updatedProjects = prev.map((prevProject) =>
          prevProject.id === projectId
            ? { ...prevProject, [name]: value }
            : prevProject,
        );
        return [...updatedProjects];
      });
    };

    const deleteProject = (id: number) => {
      if (id === 1) {
        toast({
          title: "Cannot Delete Project",
          description:
            "You cannot delete this project because it is the only project available.",
          variant: "destructive",
        });
      }
      if (id !== 1) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id),
        );
      }
    };

    return (
      <div
        key={project.id}
        className="mb-4 flex items-center justify-between gap-5"
      >
        <div className="flex w-[88%] items-center justify-between gap-3 p-1">
          <Input
            name="name"
            placeholder="name"
            defaultValue={project.name}
            onChange={(e) => handleChange(e, project.id)}
          />
          <Input
            name="url"
            placeholder="url"
            defaultValue={project.url}
            onChange={(e) => handleChange(e, project.id)}
          />
        </div>
        <div className="w-[12%]">
          <Button
            asChild
            size={"icon"}
            variant={"destructive"}
            className="cursor-pointer p-2"
            onClick={() => deleteProject(project.id)}
          >
            <Trash2 className="text-primary" />
          </Button>
        </div>
      </div>
    );
  };

  // Side Effect
  React.useEffect(() => {
    if (props.id && experience?.data) {
      const timeout = setTimeout(() => {
        startTransition(() => {
          if (experience.data) {
            const { projects, ...formDataWithoutProjects } = experience.data;
            const formattedProjects = projects.map((project: any) => ({
              name: project.name!,
              description: project.description! ?? "",
              url: project.url ?? "",
              duration: project.duration ?? 0,
            }));
            // Set the formData state with the formatted projects
            setFormData((prevFormData) => ({
              ...prevFormData,
              ...formDataWithoutProjects,
              projects: formattedProjects,
              end: formDataWithoutProjects.end ?? undefined,
            }));

            // Adding the project an ID:
            const newFormattedProjects = formattedProjects.map(
              (project: any, idx: number) => ({
                id: idx,
                name: project.name,
                description: project.description ?? "",
                url: project.url ?? "",
                duration: project.duration ?? 0,
              }),
            );

            // Also Update the Projects:
            setProjects(() => newFormattedProjects);
          }
        });
      }, 10);

      return () => clearTimeout(timeout);
    }
  }, [props.id, experience?.data]);

  return (
    <Modal
      title={pageTitle}
      isOpen={props.isOpen}
      onClose={props.onClose}
      popupClassName={cn("w-[60%] max-h-[80%]")}
    >
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-4 flex h-full flex-col">
            <div className="h-full w-full">
              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="i.e. Google Inc."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Type Description"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Start */}
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} setDate={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* End */}
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} setDate={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-3 items-end justify-end">
              <Button
                type="submit"
                className="w-[50%] cursor-pointer select-none"
                loading={isPending || isLoading}
              >
                <div>{pageButtonText}</div>
              </Button>
            </div>
          </div>

          <div className="col-span-8 flex h-full w-full flex-col justify-between">
            <div>
              <h3 className="mb-1 text-balance font-semibold leading-relaxed">
                Projects
              </h3>
              <ScrollArea className="h-[400px] rounded-md border p-1">
                <div>{projects.map((project) => renderProjects(project))}</div>
              </ScrollArea>
            </div>

            <div className="mt-2 justify-end self-end">
              <Button
                asChild
                onClick={addNewProject}
                loading={isPending}
                variant={"secondary"}
              >
                <div className="flex cursor-pointer items-center justify-center gap-1">
                  <Plus />
                  <span>Add New Project</span>
                </div>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
