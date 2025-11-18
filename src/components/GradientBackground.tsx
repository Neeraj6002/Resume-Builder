export default function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float-fast" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float-slow" 
          style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
}
