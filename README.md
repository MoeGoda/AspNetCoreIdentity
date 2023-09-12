# ASP.NET Core Identity Series
> To be continued..

## Installation instructions

The project is built with ASP.NET Core with Angular on the client side. 
1. **Basic project setup**:
    * `cd ./AspNetCoreIdentity` where the package.json file exist
    * `npm install`
    * `dotnet restore`
    * `dotnet build`
    * `dotnet run`
2. **Create the *AspNetCoreIdentityDb* database** *(skip if you want to run with In memory DB)*
    * `cd ./AspNetCoreIdentity` where the AspNetCoreIdentity.csproj exist
    * `Add-Migration initial_migration` or `dotnet ef migrations add initial_migration`
    * `Update-Database` or `dotnet ef database update`
3. **Create the *IdentityServerDb* database** *(skip if you want to run with In memory DB)*

> In case you don't want to use a real SQL Server Database when running the `AspNetCoreIdentity` project, simply set **InMemoryProvider: true** in the *appsettings.json*. This option will use in memory database

> In case you don't want to use a real SQL Server Database when running the `IdentityServer` project simply set **UseInMemoryStores: true** in the relative *appsettings.json* This option will use in memory database
