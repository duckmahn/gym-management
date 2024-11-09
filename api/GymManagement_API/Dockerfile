FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# Base image for the application runtime
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    clang zlib1g-dev

ARG BUILD_CONFIGURATION=Release

WORKDIR /src
COPY . ./
# Build stage to compile the project
RUN dotnet restore "GymManagement_API.csproj"
RUN dotnet publish "GymManagement_API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=true /p:ApiKind=BE

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "GymManagement_API.dll"]