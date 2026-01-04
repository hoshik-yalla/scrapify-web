import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-5";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

/**
 * Generate a sophisticated SAT-level reading comprehension question
 * based on the provided article content
 */
export async function generateSATQuestion(articleContent) {
  try {
    const systemPrompt = `You are an expert SAT test question writer for the College Board. Your task is to create high-quality, challenging reading comprehension questions that match the exact style and difficulty of official SAT Reading tests.

CRITICAL INSTRUCTIONS:
1. The provided text may contain scraped website artifacts like navigation menus, social media buttons, cookie notices, or other non-article content. IGNORE these completely.
2. Focus ONLY on the main substantive content of the article.
3. Create questions that test higher-order thinking: inference, analysis, synthesis, author's purpose, rhetorical strategy, or evidence-based reasoning.
4. Avoid simple recall questions. Test comprehension and analytical skills.
5. The passage excerpt should be 150-250 words from the most substantive part of the article.
6. All four answer choices must be plausible but only ONE is clearly correct.
7. Wrong answers should be sophisticated - they might be partially true, too extreme, unsupported, or misinterpret the passage.
8. The explanation must be comprehensive, explaining why the correct answer is right AND why each wrong answer is incorrect, using specific evidence from the passage.

RESPONSE FORMAT:
You MUST respond with ONLY valid JSON in this exact structure:
{
  "passage": "A carefully selected 150-250 word excerpt from the article that contains enough context for the question",
  "question": "A sophisticated question testing inference, analysis, or rhetorical understanding",
  "optA": "First answer option",
  "optB": "Second answer option", 
  "optC": "Third answer option",
  "optD": "Fourth answer option",
  "correctAnswer": "A" or "B" or "C" or "D",
  "explanation": "A detailed explanation (3-5 sentences) that: (1) explains why the correct answer is supported by the passage, (2) explains why each wrong answer is incorrect or unsupported, and (3) references specific details from the passage"
}

SAT QUESTION TYPES TO USE:
- Main idea or central claim
- Purpose of a detail or example
- Meaning of a word or phrase in context
- Function of a paragraph or sentence
- Author's attitude or tone
- Rhetorical strategy or technique
- Inference about implicit information
- Synthesis of information from multiple parts

Do not include any text outside the JSON. Do not use markdown code blocks. Return only the raw JSON object.`;

    const userPrompt = `Create one SAT-level reading comprehension question based on this article content. Remember to filter out any navigation, headers, or non-article elements that may have been scraped:

ARTICLE CONTENT:
${articleContent}

Generate the question in the exact JSON format specified. Make it challenging and sophisticated, worthy of the SAT exam.`;

    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: model,
      max_completion_tokens: 8000,
    });

    console.log('Full API Response:', JSON.stringify(response, null, 2));
    
    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Invalid API response structure');
    }

    const responseText = response.choices[0].message.content?.trim() || '';
    
    // Log the raw response for debugging
    console.log('AI Response length:', responseText.length);
    console.log('AI Response preview:', responseText.substring(0, 200));
    
    if (!responseText) {
      throw new Error('AI returned empty response');
    }

    // Try to parse JSON, handling potential markdown wrapping
    let jsonText = responseText;

    // Remove markdown code blocks if present
    if (jsonText.includes("```")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    }

    const questionData = JSON.parse(jsonText);

    // Validate the response structure
    const requiredFields = [
      "passage",
      "question",
      "optA",
      "optB",
      "optC",
      "optD",
      "correctAnswer",
      "explanation",
    ];
    for (const field of requiredFields) {
      if (!questionData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate correctAnswer is one of A, B, C, D
    if (!["A", "B", "C", "D"].includes(questionData.correctAnswer)) {
      throw new Error("correctAnswer must be A, B, C, or D");
    }

    return {
      success: true,
      ...questionData,
    };
  } catch (error) {
    console.error("AI generation error:", error.message);
    throw new Error(`Failed to generate question: ${error.message}`);
  }
}
