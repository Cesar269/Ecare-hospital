CREATE FUNCTION ObtenerMedicamentosRecetados
(
    @curp VARCHAR(18) = NULL,
    @nombre VARCHAR(20) = NULL,
    @ap_paterno VARCHAR(20) = NULL,
    @ap_materno VARCHAR(20) = NULL
)
RETURNS TABLE
AS
RETURN
(
    SELECT M.nombre_medicamento, M.descripcion
    FROM Usuario U
    INNER JOIN Receta_Usuario RU ON U.curp = RU.curp
    INNER JOIN Receta R ON RU.id_receta = R.id_receta
    INNER JOIN Medicamento_Receta MR ON R.id_receta = MR.id_receta
    INNER JOIN Medicamento M ON MR.id_medicamento = M.id_medicamento
    WHERE U.curp = @curp OR (U.nombre = @nombre AND U.ap_paterno = @ap_paterno AND U.ap_materno = @ap_materno)
);

--Ejemplo
/*
-- Obtener medicamentos recetados por CURP
SELECT nombre_medicamento, descripcion
FROM dbo.ObtenerMedicamentosRecetados(@curp);

-- Obtener medicamentos recetados por nombre y apellidos
SELECT nombre_medicamento, descripcion
FROM dbo.ObtenerMedicamentosRecetados(@nombre, @ap_paterno, @ap_materno);


*/