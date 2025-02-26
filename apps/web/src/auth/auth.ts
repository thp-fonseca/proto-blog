import { getProfile } from '@/http/get-profile'
import { defineAbilityFor } from '@workspace/acl'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  const c = await cookies()
  return !!c.get('token')?.value
}

export async function ability() {
  const userData = await getProfile();

  if (!userData) {
    redirect('/auth/sign-in');
  }

  const userAbility = defineAbilityFor({
    id: userData.user.id,
    role: userData.user.role,
  });

  return userAbility;
}

export async function auth() {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}
  redirect('/api/auth/sign-out')
}
