export function Footer() {
  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      <div className="container">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
