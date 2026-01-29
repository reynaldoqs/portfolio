export function Footer() {
  return (
    <footer className="w-full h-auto px-12 py-22">
      <div className="flex justify-center items-center ">
        <p className="text-sm text-stone-500">
          &copy; {new Date().getFullYear()} Reynaldo Quispe. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
