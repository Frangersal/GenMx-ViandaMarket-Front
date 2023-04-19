# GenMx-ViandaMarket-Front

Generation México - Equipo 1: Los Commiteros Seriales - Proyecto Integrador Vianda Market, Parte del Frontend

## Como agregar header a las páginas HTML

>Nota: es IMPORTANTE agregar PRIMERO EL HEADER antes de realizar la página ya que puede afectar en el acomodo de esta.

Instrucciones:

1. Agregar
```html

<script src="./assets/js/header.js"></script> 
```

al final de la página. Para ligar la hoja de JavaScript que trae el header.

2. Despues de la etiqueta body agregar:

```html

<header>
    <div class="headerQuick">
    </div>
</header>

```

Para definir el lugar que ocupara el header

3. Tomar en cuenta que lo primero que se agregue despues de esto puede irse detras del header, por lo que es importante
   ajustar
   ese primer cuadro para que respete el header

---

## Cualquier duda preguntar a Caro.

# Como agregar footer a las páginas HTML

Instrucciones:

1. Agregar <script src="./assets/js/footer.js"></script> antes del cierre del body. Para ligar la hoja de JavaScript que
   trae el footer.

Agregar los siguientes scripts para el correcto funcionamiento del footer antes del cierre del body
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/eb496ab1a0.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
crossorigin="anonymous"></script>

2. Despues antes del cierre del body que es donde se pone el footer semanticamente:
    <footer>

        <div class="footer">
        </div>
    </footer>

   Para definir el lugar que ocupara el footer