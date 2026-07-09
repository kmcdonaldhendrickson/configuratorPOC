SIGNOUT_BUTTON = "\"use client\";\n\nimport { useRouter } from \"next/navigation\";\nimport { createClient } from \"@/lib/supabase/client\";\n\nexport default function SignOutButton() {\n  const router = useRouter();\n  const supabase = createClient();\n\n  const handleSignOut = async () => {\n    await supabase.auth.signOut();\n    router.push(\"/login\");\n    router.refresh();\n  };\n\n  return (\n    <button\n      onClick={handleSignOut}\n      className=\"rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/80\"\n    >\n      Sign Out\n    </button>\n  );\n}\n"

with open("app/dashboard/sign-out-button.tsx", "w") as f:
    f.write(SIGNOUT_BUTTON)
print("Updated Sign Out button color")
