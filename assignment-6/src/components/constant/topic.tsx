export const topicsBook: Array<string> = [
  'Machine Learning',
  'Database',
  'Frontend',
  'Backend',
  'DevOps',
  'Programming',
  'Artificial Intelligence',
  'Big Data',
  'Cloud Computing',
  'Blockchain',
  'Internet of Things',
  'Cybersecurity',
  'Software Development',
  'UX/UI Design',
  'Computer Networking',
]

export const options: Array<JSX.Element> = topicsBook.map((topic) => {
  return (
    <option key={topic} value={topic}>
      {topic}
    </option>
  )
})
