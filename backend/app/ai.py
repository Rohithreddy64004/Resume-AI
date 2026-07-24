import os, json
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_resume_ai(resume_text, job_description, context_data=""):
    system_prompt = """
    You are a professional ATS (Applicant Tracking System) scoring engine.
    Analyze the RESUME against the JOB DESCRIPTION.
    
    SCORING RUBRIC (Strict 100 points):
    - Technical Skills (40 pts)
    - Experience Alignment (30 pts)
    - Quantifiable Achievements (20 pts)
    - Education/Formatting (10 pts)

    INSTRUCTIONS:
    - If a resume is missing a 'must-have' skill, deduct 15 points.
    - Strengths and Improvements MUST be concise sentences.
    - Return ONLY a JSON object.
    """

    user_input = f"""
    CONTEXT (Past successful matches): {context_data}
    CANDIDATE RESUME: {resume_text}
    TARGET JOB DESCRIPTION: {job_description}

    Return JSON:
    {{
        "score": 0-100,
        "strengths": "Detailed string or list of strengths",
        "improvements": "Detailed string or list of improvements",
        "summary": "Overall verdict"
    }}
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            temperature=0, 
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input}
            ]
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"AI Error: {e}")
        return {
            "score": 1, 
            "strengths": "AI analysis unavailable", 
            "improvements": "Check API configuration", 
            "summary": str(e)
        }