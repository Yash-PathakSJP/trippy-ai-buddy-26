import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Plane, Mail, Lock, ArrowLeft, Sparkles, ShieldCheck, Globe, Users, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const signupPasswordSchema = z.string().min(8, "Password must be at least 8 characters");
const signinPasswordSchema = z.string().min(1, "Password is required");

const featureCards = [
  {
    icon: Globe,
    title: "Plan anywhere",
    description: "Access a travel workspace that works across destinations, budgets, and timelines.",
  },
  {
    icon: Users,
    title: "Built for groups",
    description: "Share ideas and coordinate trips with family, friends, or teammates in one place.",
  },
  {
    icon: Clock,
    title: "Fast start",
    description: "Get back to planning in seconds with a clean, focused login and signup flow.",
  },
];

const roleOptions = ["Traveler", "Trip Planner", "Group Lead"];

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roleOptions[0]);

  const validateSignInInputs = () => {
    try {
      emailSchema.parse(email);
      signinPasswordSchema.parse(password);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.issues[0]?.message ?? "Please check your details and try again.",
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const validateSignUpInputs = () => {
    try {
      emailSchema.parse(email);
      signupPasswordSchema.parse(password);

      if (!fullName.trim()) {
        throw new Error("Name is required");
      }

      if (!role.trim()) {
        throw new Error("Role is required");
      }

      return true;
    } catch (error) {
      toast({
        title: "Validation Error",
        description: error instanceof Error ? error.message : "Please check your details and try again.",
        variant: "destructive",
      });

      return false;
    }
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateSignUpInputs()) return;

    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/app/dashboard`;
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName.trim(),
            role,
          },
        }
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Account exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Welcome aboard!",
          description: "Your account has been created successfully.",
        });
        setEmail("");
        setPassword("");
        setFullName("");
        setRole(roleOptions[0]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateSignInInputs()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Sign in failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_hsla(var(--travel-sky),0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_hsla(var(--travel-coral),0.12),_transparent_32%),linear-gradient(180deg,_hsla(var(--travel-cream),0.22)_0%,_hsl(var(--background))_35%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)] opacity-60" />

      <header className="relative z-10 flex items-center justify-between px-4 pt-5 sm:px-6 lg:px-10">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-3 py-2 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean shadow-lg">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold leading-none text-foreground">Trippy</div>
            <div className="text-xs text-muted-foreground">AI travel companion</div>
          </div>
        </button>

        <ThemeToggle />
      </header>

      <main className="relative z-10 container mx-auto px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pt-12">
        <div className="grid min-h-[calc(100vh-92px)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <section className="max-w-2xl space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-travel-sky/20 bg-travel-sky/10 px-4 py-2 text-sm font-semibold text-travel-sky shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Secure access to your travel workspace
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                <span className="block">Sign in to plan</span>
                <span className="block bg-gradient-to-r from-travel-sky via-travel-ocean to-travel-coral bg-clip-text text-transparent">
                  your next trip faster
                </span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Pick up right where you left off, or create a new account to unlock AI trip planning, shared itineraries, and a smoother booking flow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {featureCards.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className="rounded-2xl border border-border/60 bg-background/85 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-travel-sky/15 to-travel-coral/15 text-travel-sky">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-sm font-semibold text-foreground">{feature.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                Encrypted auth flow
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-travel-coral" />
                Fast signup and sign in
              </div>
            </div>
          </section>

          <section className="w-full lg:max-w-md lg:justify-self-end">
            <Card className="relative overflow-hidden border-border/60 bg-background/90 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl animate-slide-up">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-travel-sky via-travel-ocean to-travel-coral" />

              <CardHeader className="space-y-4 pt-8">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-travel-sky/10 px-3 py-1 text-xs font-semibold text-travel-sky">
                    <Sparkles className="h-4 w-4" />
                    Travel access
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    Protected
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
                  <CardDescription className="text-base">
                    Sign in or create an account to keep your travel plans in sync.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="pb-2">
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid h-12 w-full grid-cols-2 rounded-2xl bg-muted/80 p-1">
                    <TabsTrigger
                      value="signin"
                      className="rounded-xl text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="rounded-xl text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="mt-6">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 pl-10"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <div className="relative">
                          <Lock className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signin-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 pl-10"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="h-12 w-full bg-gradient-to-r from-travel-sky to-travel-ocean text-base font-semibold shadow-lg transition-all hover:shadow-xl"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                        {!isLoading ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="mt-6">
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name">Full Name</Label>
                          <div className="relative">
                            <Input
                              id="signup-name"
                              type="text"
                              placeholder="Enter your full name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="h-12"
                              required
                              disabled={isLoading}
                            />
                          </div>
                        </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 pl-10"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="Create a password (min. 8 characters)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 pl-10"
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <p className="text-xs leading-5 text-muted-foreground">
                          Use at least 8 characters so your new travel workspace stays secure.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-role">Role</Label>
                        <select
                          id="signup-role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isLoading}
                        >
                          {roleOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Button
                        type="submit"
                        className="h-12 w-full bg-gradient-to-r from-travel-coral to-travel-sunset text-base font-semibold shadow-lg transition-all hover:shadow-xl"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating account..." : "Create Account"}
                        {!isLoading ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="flex justify-center pb-8 pt-6">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Back to home
                </Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Auth;
