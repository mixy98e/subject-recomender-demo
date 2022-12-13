using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.ML;
using Microsoft.OpenApi.Models;
using ModuleDependentSubjectsPrediction_CA;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

// Configure app
var builder = WebApplication.CreateBuilder(args);

// Configure prediction pool

builder.Services.AddPredictionEnginePool<Subject1Prediction.ModelInput, Subject1Prediction.ModelOutput>()
    .FromFile("Subject1Prediction.zip");

builder.Services.AddPredictionEnginePool<Subject2Prediction.ModelInput, Subject2Prediction.ModelOutput>()
    .FromFile("Subject2Prediction.zip");

builder.Services.AddPredictionEnginePool<Subject3Prediction.ModelInput, Subject3Prediction.ModelOutput>()
    .FromFile("Subject3Prediction.zip");

builder.Services.AddPredictionEnginePool<ModulePrediction.ModelInput, ModulePrediction.ModelOutput>()
    .FromFile("ModulePrediction.zip");

builder.Services.AddPredictionEnginePool<ModuleDependentSubjects.ModelInput, ModuleDependentSubjects.ModelOutput>()
    .FromFile("ModuleDependentSubjects.zip");


// Configure endpoints and open api
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS", builder =>
    {
        builder.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin();
    });
});

builder.Services.AddSwaggerGen(c =>
{
    c.CustomSchemaIds(type => type.ToString());
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Subject and Module Prediction api", Version = "v1" });
});
var app = builder.Build();

app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});

app.UseCors("CORS");

app.UsePathBase("/predict");


// Test endpoint
app.MapGet("/test", () => { return "I'm working!"; });


// Define prediction routes & handlers
app.MapPost("/s1",
   async (PredictionEnginePool<Subject1Prediction.ModelInput, Subject1Prediction.ModelOutput> predictionEnginePool, Subject1Prediction.ModelInput input) =>
        await Task.FromResult(predictionEnginePool.Predict(input)));

app.MapPost("/s2",
   async (PredictionEnginePool<Subject2Prediction.ModelInput, Subject2Prediction.ModelOutput> predictionEnginePool, Subject2Prediction.ModelInput input) =>
        await Task.FromResult(predictionEnginePool.Predict(input)));

app.MapPost("/s3",
   async (PredictionEnginePool<Subject3Prediction.ModelInput, Subject3Prediction.ModelOutput> predictionEnginePool, Subject3Prediction.ModelInput input) =>
        await Task.FromResult(predictionEnginePool.Predict(input)));

app.MapPost("/m",
   async (PredictionEnginePool<ModulePrediction.ModelInput, ModulePrediction.ModelOutput> predictionEnginePool, ModulePrediction.ModelInput input) =>
        await Task.FromResult(predictionEnginePool.Predict(input)));

app.MapPost("/mds",
   async (PredictionEnginePool<ModuleDependentSubjects.ModelInput, ModuleDependentSubjects.ModelOutput> predictionEnginePool, ModuleDependentSubjects.ModelInput input) =>
        await Task.FromResult(predictionEnginePool.Predict(input)));


// Run app
app.Run();

