import bcrypt from 'bcryptjs';

export async function encrypt(value, force = 10) {
  try {
    const result = await bcrypt.hash(value, force);

    return result;
  } catch (error) {
    throw new Error('Can not encrypt this value.');
  }
}

export async function decryptAndCompareIfIsEqual(frist_value, second_value) {
  const result = await bcrypt.compare(frist_value, second_value);

  return result;
}
