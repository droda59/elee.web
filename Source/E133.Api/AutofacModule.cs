using Autofac;

namespace E133.Api
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