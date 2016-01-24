using System;
using Microsoft.Extensions.DependencyInjection;

using Autofac;
using Autofac.Extensions.DependencyInjection;

namespace CookItNow.Api
{
    public static class IocConfig
    {
        public static IServiceProvider RegisterComponents(IServiceCollection services)
        {
			var builder = new ContainerBuilder();
            
            builder.RegisterModule(new AutofacModule());
            builder.RegisterModule(new CookItNow.Parser.AutofacModule());

            builder.Populate(services);
            
            var container = builder.Build();
            
            return container.Resolve<IServiceProvider>();
        }
    }
}