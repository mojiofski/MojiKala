import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Login successfull!", user: data.user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Somthing wrong!", error },
      { status: 500 }
    );
  }
}
