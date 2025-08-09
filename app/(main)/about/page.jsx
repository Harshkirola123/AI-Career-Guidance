import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // adjust import paths based on your setup
import { Separator } from "@/components/ui/separator";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl font-bold">
            About Us
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 pt-5 text-base sm:text-lg">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-primary">AI Career Guide</span>{" "}
            – your personalized career compass in the world of Artificial
            Intelligence. Our mission is to bridge the gap between aspiring
            professionals and the rapidly evolving AI industry.
          </p>
          <p>
            Whether you're just starting out, switching careers, or looking to
            advance in AI, we offer tailored guidance through:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Customized AI career paths</li>
            <li>Technology and skill recommendations</li>
            <li>Salary insights and job market trends</li>
            <li>Resume, cover letter, and interview support</li>
          </ul>
          <p>
            Backed by intelligent tools and real-time industry data, our
            platform helps you make confident career choices and stand out in
            the competitive AI landscape.
          </p>
          <p>
            Join thousands of learners and professionals shaping the future with
            AI – and let us help you take the next step.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
