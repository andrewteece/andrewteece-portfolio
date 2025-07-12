type ProjectCardProps = {
  title: string;
  tech: string;
  description: string;
  github?: string;
  demo?: string;
  image?: string;
};

export default function ProjectCard({
  title,
  tech,
  description,
  github,
  demo,
  image,
}: ProjectCardProps): JSX.Element {
  return (
    <div className='border rounded-xl p-4 hover:shadow-lg transition'>
      {image && (
        <img
          src={image}
          alt={`${title} screenshot`}
          className='w-full h-48 object-cover rounded-lg mb-4'
        />
      )}
      <h4 className='text-xl font-bold mb-1'>{title}</h4>
      <p className='text-sm text-gray-500 mb-2'>{tech}</p>
      <p className='text-gray-700 text-sm mb-4'>{description}</p>
      <div className='flex gap-4 text-sm'>
        {demo && (
          <a
            href={demo}
            target='_blank'
            className='text-blue-600 hover:underline'
          >
            Live Demo
          </a>
        )}
        {github && (
          <a
            href={github}
            target='_blank'
            className='text-gray-700 hover:underline'
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
