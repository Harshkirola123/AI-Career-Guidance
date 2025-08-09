"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getRoleInsights(targetRole) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
      experience: true,
      bio: true,
    },
  });

  if (!user) throw new Error("User not found");

  //   const prompt = `
  //     A user wants to switch from their current role of "${
  //       user.industry
  //     }" to "${targetRole}".
  //     They currently have the following skills: ${
  //       user.skills?.join(", ") || "none"
  //     }.

  //     Based on this information:
  //     - What skills from their profile match well with the target role?
  //     - What new skills or areas should they improve to succeed in that role?
  //     - What practical transition steps should they follow?
  //     - Estimate a realistic success probability percentage (0–100%) of making the switch.

  //     Return the result strictly in the following JSON format:
  //     {
  //       "matchedSkills": ["string"],
  //       "skillsToImprove": ["string"],
  //       "transitionPlan": ["string"],
  //       "successProbability": number
  //     }
  //   `;
  const prompt = `
A user currently works in the industry "${user.industry || "not specified"}". 
They want to switch to the target role "${targetRole}".

Profile details:
- Years of experience: ${user.experience ?? "not specified"}
- Bio: ${user.bio ? `"${user.bio}"` : "No bio provided"}
- Skills: ${user.skills?.length ? user.skills.join(", ") : "none"}

Based on this information:
- Which skills from their profile match well with the target role?
- What new skills or areas should they improve to succeed in that role?
- What practical steps should they follow for a smooth transition?
- Estimate a realistic success probability (0–100%) of making the switch.

Return the result strictly in the following JSON format. Ensure that "transitionPlan" is an array of separate step strings, not a single combined string.
{
  "matchedSkills": ["string"],
  "skillsToImprove": ["string"],
  "transitionPlan": ["string"],
  "successProbability": number
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();

    const insights = JSON.parse(cleaned);
    return insights;
  } catch (error) {
    console.error("Error generating role insights:", error);
    throw new Error("Failed to generate role transition insights.");
  }
}
