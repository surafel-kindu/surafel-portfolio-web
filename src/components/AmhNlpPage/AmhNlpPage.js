import React from 'react';
import { FiExternalLink } from "react-icons/fi";

import profile from '../../asset/profile.JPG';

function AmhNlpPage() {
    return (
        <div className='flex flex-row bg-light-1 px-4 md:px-20 items-center gap-6 py-16 text-darker-2 font-roboto'>
            <div className='flex flex-col items-start w-1/4'>
                <img src={profile} alt="profile pic" className="w-48 rounded-xl object-cover border-4 duration-200 border-white mb-2" />
                <div className="flex flex-row gap-3 items-center">
                    <div className="text-3xl font-bold duration-300 text-center">SURAFEL KINDU</div>
                    <a href="https://www.linkedin.com/in/surafelk/"  
                    className="text-3xl font-roboto font-bold hover:text-orange-dark duration-300 text-center">
                        <FiExternalLink size={20} className=""/>
                    </a>
                </div>
                <div className="text-md text-slate-600 text-center">
                    Software Engineer and AI Researcher
                </div>
            </div>
            <div className='flex flex-col flex-grow items-start'>
                {/* <img src={profile} alt="profile pic" className="w-40 rounded-full hover:cursor-pointer object-cover border-4 duration-200 border-white" /> */}
                <a href="https://amharicsentiment.netlify.app/"  
                className="text-4xl font-medium hover:text-slate-500 duration-300 mb-4">Amharic Hate Speech Detection Using Transformers</a>
                <div className="font-normal text-md md:text-lg text-slate-600">
                    The scope of this project is limited to the presence or absence of hate speech on Amharic language Twitter posts. 
                    In this context, the term 'hate speech' refers to abusive or threatening statements or phrases that describe prejudice against a particular group in Ethiopia.
                </div>
            </div>
        </div>
    );
}

export default AmhNlpPage;