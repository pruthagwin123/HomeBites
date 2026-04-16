export function getTimeGreeting(name = 'there') {
  const hour = new Date().getHours();

  if (hour < 12) {
    return `Good morning, ${name.split(' ')[0]}! Ready for a fresh start?`;
  }

  if (hour < 17) {
    return `Good afternoon, ${name.split(' ')[0]}! What are you craving today?`;
  }

  return `Good evening, ${name.split(' ')[0]}! Dinner plans just got easier.`;
}
