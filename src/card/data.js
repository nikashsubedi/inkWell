// src/data.js

const generateRandomData = (count) => {
  const data = [];
  const categories = ["Design", "Development", "Marketing", "Technology", "Business", "Lifestyle", "Photography", "Art", "Science", "Health"];
  const adjectives = [
    "Minimalist", "Effective", "Advanced", "Modern", "Creative", "Essential", "Practical",
    "Innovative", "Future-Proof", "Cutting-Edge", "Intuitive", "Dynamic", "Strategic",
    "Engaging", "Seamless", "Optimized", "Responsive", "Efficient", "Harmonious", "Bold"
  ];
  const nouns = [
    "UI", "Web Apps", "Strategies", "Analytics", "Growth", "Workflows", "Solutions",
    "Experiences", "Frameworks", "Designs", "Interfaces", "Branding", "Content",
    "AI", "Security", "Automation", "Sustainability", "Wellness", "Photography", "Illustration"
  ];
  const authorFirstNames = [
    "Emily", "John", "Sarah", "David", "Anna", "Michael", "Olivia", "James", "Sophia", "Daniel",
    "Chloe", "Liam", "Ava", "Noah", "Isabella", "William", "Mia", "Benjamin", "Charlotte", "Elijah"
  ];
  const authorLastNames = [
    "Moore", "Smith", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Taylor", "Anderson", "Thomas",
    "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez"
  ];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const randomAdj1 = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun1 = nouns[Math.floor(Math.random() * nouns.length)];
    const randomAdj2 = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun2 = nouns[Math.floor(Math.random() * nouns.length)];

    const title = `Principles of ${randomAdj1} ${randomNoun1} Design`;
    const description = `Discover how ${Math.random() > 0.5 ? 'less is more' : 'every detail counts'} in creating ${randomAdj2.toLowerCase()} and ${randomNoun2.toLowerCase()}-focused experiences.`;

    const authorFirstName = authorFirstNames[Math.floor(Math.random() * authorFirstNames.length)];
    const authorLastName = authorLastNames[Math.floor(Math.random() * authorLastNames.length)];
    const authorName = `${authorFirstName} ${authorLastName}`;
    const authorInitials = `${authorFirstName.charAt(0)}${authorLastName.charAt(0)}`;

    const readTime = Math.floor(Math.random() * 15) + 3; // 3 to 17 minutes
    const likes = Math.floor(Math.random() * 500) + 20; // 20 to 519 likes
    const comments = Math.floor(Math.random() * 80) + 5; // 5 to 84 comments
    const isBookmarked = Math.random() > 0.5;
    const topSectionTitle = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)].split(' ')[0]}`;

    data.push({
      id: i + 1,
      category: category,
      title: title,
      description: description,
      author: {
        name: authorName,
        initials: authorInitials,
      },
      readTime: readTime,
      likes: likes,
      comments: comments,
      isBookmarked: isBookmarked,
      topSectionTitle: topSectionTitle,
    });
  }

  return data;
};

export const postsData = generateRandomData(1000);