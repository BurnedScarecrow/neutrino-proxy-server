# Neutrino server

## Сборка и установка

```bash
    sudo ./install.sh
```

## Изменение UI в пакете

1. В папке panel изменяются исходники интерфейса
2. Cобирается Vue приложениеиз папки panel

```
    npm run build
```

3. Содержимое front/dist копировать в /usr/share/neutrino-server/front/

## Изменение API в пакете

1. В папке back изменяются исходники API
2. Содержимое back копировать в /usr/share/neutrino-server/back/ исключая node_modules
