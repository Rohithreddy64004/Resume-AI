import {
    Brain,
    Target,
    Sparkles
    } from "lucide-react";
    
    
    export default function Feature(){
    
    const data=[
    
    {
    icon:<Brain/>,
    title:"AI Resume Review",
    text:"Get recruiter level feedback instantly."
    },
    
    {
    icon:<Target/>,
    title:"Job Matching",
    text:"Match your resume with any job description."
    },
    
    {
    icon:<Sparkles/>,
    title:"Resume Optimization",
    text:"Improve ATS score with AI suggestions."
    }
    
    
    ];
    
    
    return (
    
    <div className="
    grid
    md:grid-cols-3
    gap-8
    mt-12
    ">
    
    
    {
    data.map((item,index)=>(
    
    <div
    key={index}
    className="
    bg-gray-900
    border
    border-gray-800
    rounded-2xl
    p-8
    hover:border-blue-500
    transition
    "
    >
    
    
    <div className="
    text-blue-400
    mb-5
    ">
    
    {item.icon}
    
    </div>
    
    
    <h3 className="
    text-xl
    font-bold
    ">
    
    {item.title}
    
    </h3>
    
    
    <p className="
    mt-3
    text-gray-400
    ">
    
    {item.text}
    
    </p>
    
    
    </div>
    
    ))
    
    }
    
    
    </div>
    
    
    )
    
    }