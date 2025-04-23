import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    // 这里是示例响应，实际部署时您需要接入真实的AI模型服务
    const mockResults = [
      { class: "猫", confidence: 0.95 },
      { class: "宠物", confidence: 0.88 },
      { class: "哺乳动物", confidence: 0.82 }
    ];

    return NextResponse.json({ results: mockResults });
  } catch (error) {
    return NextResponse.json(
      { error: "处理图片时出错" },
      { status: 500 }
    );
  }
} 