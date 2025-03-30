// Helper code as presented in the course work
// It generates a random booking number, 3 letters folowed by 3 numbers

export default function generateBookingNumber() {
  let no = '';
  while (no.length < 3) {
    no += 'ABCDEFGHIJKLMNOPQRSTUVWZXYZ'[Math.floor(Math.random() * 26)];
  }
  while (no.length < 6) {
    no += Math.floor(Math.random() * 10);
  }
  return no;
}