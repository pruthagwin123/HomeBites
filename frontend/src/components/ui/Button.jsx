import clsx from 'clsx';

function Button({ className, children, ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,23,42,0.17)] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
