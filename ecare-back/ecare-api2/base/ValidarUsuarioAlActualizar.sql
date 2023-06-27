CREATE TRIGGER ValidarUsuarioTrigger
ON Usuario
AFTER UPDATE
AS
BEGIN
    -- Verificar actualización del correo
    IF UPDATE(correo)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE correo NOT LIKE '%@%.%') > 0
        BEGIN
            RAISERROR('El correo debe cumplir con el formato nombre@dominio.com', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualización del password
    IF UPDATE(password)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE LEN(password) < 8 OR LEN(password) > 15) > 0
        BEGIN
            RAISERROR('El password debe tener entre 8 y 15 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualización del nombre
    IF UPDATE(nombre)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE nombre = '' OR LEN(nombre) > 20) > 0
        BEGIN
            RAISERROR('El nombre no puede ser cadena vacía ni tener más de 20 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualización del ap_paterno
    IF UPDATE(ap_paterno)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE ap_paterno = '' OR LEN(ap_paterno) > 20) > 0
        BEGIN
            RAISERROR('El apellido paterno no puede ser cadena vacía ni tener más de 20 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualización del ap_materno
    IF UPDATE(ap_materno)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE ap_materno = '' OR LEN(ap_materno) > 20) > 0
        BEGIN
            RAISERROR('El apellido materno no puede ser cadena vacía ni tener más de 20 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualización del celular
    IF UPDATE(celular)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE LEN(celular) < 8 OR LEN(celular) > 10) > 0
        BEGIN
            RAISERROR('El celular debe tener entre 8 y 10 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualización de la edad
    IF UPDATE(edad)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE edad < 0) > 0
        BEGIN
            RAISERROR('La edad no puede ser menor a 0', 16, 1);
            ROLLBACK;
        END
    END
END;
