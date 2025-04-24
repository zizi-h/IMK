import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { error: "未提供图片数据" },
        { status: 400 }
      );
    }

    // 检查图片大小
    const base64Size = Buffer.from(image.split(',')[1], 'base64').length;
    if (base64Size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "图片大小超过5MB限制" },
        { status: 400 }
      );
    }

    // 这里是示例响应，实际部署时您需要接入真实的AI模型服务
    const mockResults = [
      { class: "猫", confidence: 0.95 },
      { class: "宠物", confidence: 0.88 },
      { class: "哺乳动物", confidence: 0.82 }
    ];

    return NextResponse.json({ 
      results: mockResults,
      success: true
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: "处理图片时出错",
        details: error instanceof Error ? error.message : "未知错误"
      },
      { status: 500 }
    );
  }
}