using Autofac;

namespace CookItNow.Api
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<QuickRecipeRepository>()
                .As<IQuickRecipeRepository>()
                .SingleInstance();
        }
    }
}