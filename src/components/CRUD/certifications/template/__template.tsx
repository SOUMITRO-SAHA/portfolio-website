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
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { cn } from "@/utils";
import { CertificationSchema } from "@/validators/certification.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

export interface CECertificationProps {
  title?: string;
  id?: string | null;
  buttonText?: string;
  isOpen: boolean;
  onClose: () => void;
}

const initialDefaultState = {
  title: "",
  imageUrl: "",
  certificationLink: "",
  dateOfCompletion: new Date(),
};

const CECertification: React.FC<CECertificationProps> = (props) => {
  const { title = "Create", id, buttonText, isOpen, onClose, ...rest } = props;

  const [defaultState, setDefaultState] = React.useState(initialDefaultState);

  const pageTitle = `${title} Certification`;
  const pageButtonText = buttonText ? buttonText : "Save";

  // tRPC context
  const ctx = api.useContext();

  // tRPC Query
  const { data: certification, isLoading: certificationLoading } =
    api.certification.getById.useQuery({ id: id ?? "" });

  // tRPC Mutation
  const { mutate, isLoading } = api.certification.mutate.useMutation({
    onSuccess: async () => {
      await ctx.certification.invalidate();
      toast({
        title: "Successfully created the Certification",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Something went wrong, while creating the Certification",
      });
    },
  });

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof CertificationSchema>>({
    resolver: zodResolver(CertificationSchema),
    defaultValues: defaultState,
  });

  const onSubmit = (values: z.infer<typeof CertificationSchema>) => {
    startTransition(async () => {
      mutate({
        title: values.title,
        certificationLink: values.certificationLink,
        imageUrl: values.imageUrl,
        dateOfCompletion: values.dateOfCompletion,
      });
    });
  };

  // Side Effects
  React.useEffect(() => {
    if (id && certification) {
      setDefaultState({
        title: certification.title,
        imageUrl: certification.imageUrl,
        certificationLink: certification.certificationLink,
        dateOfCompletion: certification.dateOfCompletion,
      });
    }
  }, [id]);

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
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="title"
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

            {/* Date Of Completion */}
            <FormField
              control={form.control}
              name="dateOfCompletion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Of Completion</FormLabel>
                  <FormControl>
                    <div>
                      <DatePicker setDate={field.onChange} date={field.value} />
                    </div>
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

export default CECertification;
