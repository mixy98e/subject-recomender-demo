﻿// This file was auto-generated by ML.NET Model Builder. 
using Microsoft.ML;
using Microsoft.ML.Data;
using System;
using System.Linq;
using System.IO;
using System.Collections.Generic;

public partial class Subject3Prediction
{
    /// <summary>
    /// model input class for Subject3Prediction.
    /// </summary>
    #region model input class
    public class ModelInput
    {
        [ColumnName(@"GENDER")]
        public string GENDER { get; set; }

        [ColumnName(@"AGE")]
        public float AGE { get; set; }

        [ColumnName(@"AVERAGE_GRADE")]
        public float AVERAGE_GRADE { get; set; }

        [ColumnName(@"FINAL_GRADE")]
        public float FINAL_GRADE { get; set; }

        [ColumnName(@"NUMBER_OF_YEARS_STUDIED")]
        public float NUMBER_OF_YEARS_STUDIED { get; set; }

        [ColumnName(@"YEAR_STUDY_START")]
        public float YEAR_STUDY_START { get; set; }

        [ColumnName(@"AVERAGE_TEST_TAKEN")]
        public float AVERAGE_TEST_TAKEN { get; set; }

        [ColumnName(@"MAX_TEST_TAKEN")]
        public float MAX_TEST_TAKEN { get; set; }

        [ColumnName(@"AVERAGE_OVERFLOW_EXAM")]
        public float AVERAGE_OVERFLOW_EXAM { get; set; }

        [ColumnName(@"CHOOSEN_MODULE_ID")]
        public float CHOOSEN_MODULE_ID { get; set; }

        [ColumnName(@"CHOOSEN_SUBJECT_ID_3_BLOCK_A")]
        public float CHOOSEN_SUBJECT_ID_3_BLOCK_A { get; set; }

    }

    #endregion

    /// <summary>
    /// model output class for Subject3Prediction.
    /// </summary>
    #region model output class
    public class ModelOutput
    {
        [ColumnName("PredictedLabel")]
        public float Prediction { get; set; }

        public float[] Score { get; set; }
    }

    #endregion

    private static string MLNetModelPath = Path.GetFullPath("Subject3Prediction.zip");

    public static readonly Lazy<PredictionEngine<ModelInput, ModelOutput>> PredictEngine = new Lazy<PredictionEngine<ModelInput, ModelOutput>>(() => CreatePredictEngine(), true);

    /// <summary>
    /// Use this method to predict on <see cref="ModelInput"/>.
    /// </summary>
    /// <param name="input">model input.</param>
    /// <returns><seealso cref=" ModelOutput"/></returns>
    public static ModelOutput Predict(ModelInput input)
    {
        var predEngine = PredictEngine.Value;
        return predEngine.Predict(input);
    }

    private static PredictionEngine<ModelInput, ModelOutput> CreatePredictEngine()
    {
        var mlContext = new MLContext();
        ITransformer mlModel = mlContext.Model.Load(MLNetModelPath, out var _);
        return mlContext.Model.CreatePredictionEngine<ModelInput, ModelOutput>(mlModel);
    }
}

