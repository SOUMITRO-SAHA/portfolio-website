import type { FilterOptionsType } from "@/assets/admin-constant";
import { AsyncPaginateSelect } from "@/components/common/select";
import MarkdownEditor from "@/components/markdown-input/MarkdownEditor";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { cn } from "@/utils";
import { EducationSchema } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

export interface CEEducationProps {
  title?: string;
  id?: string | null;
  buttonText?: string;
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData = {
  courseName: "",
  description: "",
  topics: "",
  tags: [],
  imageUrl: undefined,
  certificationLink: undefined,
};

const CEEducation: React.FC<CEEducationProps> = (props) => {
  const { title = "Create", id, buttonText, isOpen, onClose, ...rest } = props;

  const pageTitle = `${title} Education`;
  const pageButtonText = buttonText ? buttonText : "Save";

  const [loading, setLoading] = React.useState<boolean>(false);
  const [formData, setFormData] =
    React.useState<z.infer<typeof EducationSchema>>(initialFormData);
  const [filterOptions, setFilterOptions] = React.useState<FilterOptionsType[]>(
    [],
  );

  // tRPC context
  const ctx = api.useContext();

  // tRPC Query
  const education = id ? api.education.getById.useQuery({ id: id }) : null;

  // tRPC Mutation
  const { mutate, isLoading } = api.education.create.useMutation({
    onSuccess: async () => {
      await ctx.experience.invalidate();
      toast({
        title: "Successfully created the Education",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Something went wrong, while creating the Education",
      });
    },
  });

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof EducationSchema>>({
    resolver: zodResolver(EducationSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: z.infer<typeof EducationSchema>) => {
    startTransition(async () => {
      mutate({
        courseName: values.courseName,
        description: values.description,
        topics: values.topics,
        tags: values.tags,
        imageUrl: values.imageUrl,
        certificationLink: values.certificationLink,
      });
    });
  };

  // Side Effect
  React.useEffect(() => {
    if (id && education?.data) {
      if (education.data) {
        setLoading(true);
        setFormData({
          courseName: education.data.courseName,
          description: education.data.description,
          topics: education.data.topics,
          tags: education.data.tags,
          imageUrl: education.data.imageUrl
            ? education.data.imageUrl
            : undefined,
          certificationLink: education.data.certificationLink
            ? education.data.certificationLink
            : undefined,
        });

        const filterOptions = education?.data?.tags?.map((tag) => ({
          label: tag,
          value: tag,
        }));

        setFilterOptions(filterOptions);

        setLoading(false);
      }
    }
  }, [id, education]);

  return (
    <Modal
      title={pageTitle}
      isOpen={isOpen}
      onClose={onClose}
      popupClassName={cn("w-[60%] max-h-[80%]")}
    >
      <Form {...form}>
        <form
          className="grid h-full w-full grid-cols-12 gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-6 flex flex-col gap-3">
            {/* Course Name */}
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Course Name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Certification Link */}
            <FormField
              control={form.control}
              name="certificationLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification Link*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Certification Link"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <h3>Tags*</h3>
                      {!id && (
                        <span className="text-xs text-gray-400">
                          (Create Tags " , " seperated)
                        </span>
                      )}
                    </div>
                  </FormLabel>
                  <FormControl>
                    {id ? (
                      <AsyncPaginateSelect
                        {...field}
                        options={filterOptions}
                        placeholder="Select Topics..."
                        required
                      />
                    ) : (
                      <Input placeholder="Type Tags..." {...field} />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 flex h-full flex-col gap-3">
            {/* Image Url */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Url</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Image Url"
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
                <FormItem className="h-[calc(100%-2rem)]">
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={cn("h-[calc(100%-2rem)]")}
                      disabled={isPending}
                      placeholder="Type Description"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Topics */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <h3>Topics*</h3>
                      {!id && (
                        <span className="text-xs text-gray-400">
                          (It Support Markdown Inputs)
                        </span>
                      )}
                    </div>
                  </FormLabel>
                  <FormControl>
                    <MarkdownEditor {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full mt-3 items-end justify-end">
            <Button
              type="submit"
              className="w-[15%] cursor-pointer select-none"
              loading={isPending || isLoading}
            >
              <div>{pageButtonText}</div>
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default CEEducation;
