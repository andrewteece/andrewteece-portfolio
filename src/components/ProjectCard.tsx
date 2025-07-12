type ProjectCardProps = {
  title: string;
  tech: string;
  description: string;
};

export default function ProjectCard({
  title,
  tech,
  description,
}: ProjectCardProps): JSX.Element {
  return (
    <div className='border rounded-xl p-6 hover:shadow-lg transition'>
      <h4 className='text-xl font-bold mb-1'>{title}</h4>
      <p className='text-sm text-gray-500 mb-2'>{tech}</p>
      <p className='text-gray-700 text-sm'>{description}</p>
    </div>
  );
}
