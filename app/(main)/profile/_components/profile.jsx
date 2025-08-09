"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser, getCurrentUserProfile } from "@/actions/user";
import useFetch from "@/hooks/use-fetch";

const EditProfileForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const fetchUserProfile = async () => {
    const user = await getCurrentUserProfile();
    console.log(user);
    if (user) {
      const [industry, subIndustry] = user.industry?.split("-") || [];
      setValue("industry", industry);
      setValue("subIndustry", user.subIndustry || "");
      setSelectedIndustry(industries.find((ind) => ind.id === industry));
      setValue("bio", user.bio || "");
      setValue("experience", `${user.experience}` || "");
      setValue("skills", user.skills?.join(", ") || "");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onSubmit = async (values) => {
    const formattedIndustry = `${values.industry}-${values.subIndustry
      .toLowerCase()
      .replace(/ /g, "-")}`;
    try {
      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
      toast.success("Profile updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  const watchIndustry = watch("industry");

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8  min-h-screen">
      <Card className="w-full max-w-2xl shadow-lg border-t-4 ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Edit Your Profile
          </CardTitle>
          <CardDescription>
            Keep your profile up to date to receive accurate recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Industry */}
            <div>
              <Label>Industry</Label>
              <Select
                onValueChange={(val) => {
                  setValue("industry", val);
                  setSelectedIndustry(industries.find((ind) => ind.id === val));
                  setValue("subIndustry", "");
                }}
                value={watch("industry")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {industries.map((ind) => (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* SubIndustry */}
            {watchIndustry && (
              <div>
                <Label>Specialization</Label>
                <Select
                  onValueChange={(val) => setValue("subIndustry", val)}
                  value={watch("subIndustry")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {selectedIndustry?.subIndustries?.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Experience */}
            <div>
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                min="0"
                max="50"
                {...register("experience")}
                placeholder="Enter your experience"
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div>
              <Label>Skills</Label>
              <Input
                {...register("skills")}
                placeholder="e.g., React, Python, SQL"
              />
              <p className="text-sm text-muted-foreground">
                Separate skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <Label>Professional Bio</Label>
              <Textarea
                {...register("bio")}
                className="h-28"
                placeholder="Describe your professional background"
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button className="w-full" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfileForm;
