
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../components/ui/card';
import {supabase} from "../lib/supabaseClient.js";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import {Label} from "recharts";
import {Input} from "../components/ui/Input.jsx";
import {Button} from "../components/ui/Button.jsx";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        const loadingToast = toast.loading("Signing in...");

        const { error,data } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });
        if (error) {
            toast.error("Incorrect email or password", { id: loadingToast });
            setLoading(false)
        } else {
            localStorage.setItem("username",data.user.user_metadata.full_name);
            toast.success("Welcome back!", { id: loadingToast });
            setLoading(false)
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl relative z-10">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                    <CardDescription className="text-blue-100">
                        Sign in to access your weather dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white font-medium">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 transition-all duration-200 group"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                </CardContent>

                <CardFooter className="text-center">
                    <p className="text-sm text-blue-200">
                        Don't have an account?{' '}
                        <button className="text-blue-300 hover:text-white font-semibold transition-colors" onClick={()=> navigate('/signup')}>
                            Sign up
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
