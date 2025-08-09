"use client";

import { useEffect } from "react";
import { use } from "react";
import { getRoleInsights } from "@/actions/roleInsights";
import useFetch from "@/hooks/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";

const RoleInsightsPage = ({ params }) => {
  const { role } = use(params);
  const decodedRole = decodeURIComponent(role);

  const { data: insights, loading, error, fn } = useFetch(getRoleInsights);

  useEffect(() => {
    fn(decodedRole);
  }, [decodedRole]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-10 w-2/3 rounded-md" />
        <Skeleton className="h-5 w-1/2 rounded-md mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-40 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
        </div>

        <Skeleton className="h-64 rounded-lg mt-6" />
      </div>
    );
  }

  if (error)
    return (
      <Card className="max-w-4xl mx-auto mt-8 border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle size={24} />
            <p className="font-medium">Error: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    );

  if (!insights)
    return (
      <Card className="max-w-4xl mx-auto mt-8">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-gray-500">
            <AlertCircle size={24} />
            <p className="font-medium">
              No insights available for this role yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );

  // Calculate probability color based on value
  const getProbabilityColor = (value) => {
    if (value >= 70) return "text-green-600";
    if (value >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary tracking-tight">
          {decodedRole}
        </h1>
        <p className="text-muted-foreground">
          Career insights and transition plan based on your profile
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Skills Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-medium">Matching Skills</h3>
                  <span className="text-xs text-muted-foreground">
                    {insights.matchedSkills.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {insights.matchedSkills.length > 0 ? (
                    insights.matchedSkills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      No matching skills found
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-medium">Skills to Develop</h3>
                  <span className="text-xs text-muted-foreground">
                    {insights.skillsToImprove.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {insights.skillsToImprove.length > 0 ? (
                    insights.skillsToImprove.map((skill, i) => (
                      <Badge
                        key={i}
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      No skills to improve
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Probability Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Success Probability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full py-4">
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset={
                      282.7 - (282.7 * insights.successProbability) / 100
                    }
                    strokeLinecap="round"
                    className={getProbabilityColor(insights.successProbability)}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span
                  className={`absolute text-2xl font-bold ${getProbabilityColor(
                    insights.successProbability
                  )}`}
                >
                  {insights.successProbability}%
                </span>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {insights.successProbability >= 70 ? (
                    <span>You have a strong match for this role!</span>
                  ) : insights.successProbability >= 40 ? (
                    <span>You have a moderate match for this role</span>
                  ) : (
                    <span>
                      You may need significant upskilling for this role
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transition Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Suggested Transition Path
          </CardTitle>
          <CardDescription>
            Follow these steps to successfully transition to this role
          </CardDescription>
        </CardHeader>
        <CardContent>
          {insights.transitionPlan.length > 0 ? (
            <ol className="space-y-4">
              {insights.transitionPlan.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                      {i + 1}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No transition plan is available for this role.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleInsightsPage;
