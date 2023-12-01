# Neutrino server

## Сборка и установка

```bash
    sudo ./build.sh
```

## Изменение UI в пакете

1. В папке panel изменяются исходники интерфейса
2. Cобирается Vue приложениеиз папки panel

```
    npm run build
```

3. Содержимое neutrino-front копировать в /usr/share/neutrino-server/front/

## Изменение API в пакете

1. В папке back изменяются исходники API
2. Содержимое neutrino-back копировать в /usr/share/neutrino-server/back

## Скачивание deb пакета через wget
 **Ubuntu 22.04** 
```bash 
    wget https://github.com/BurnedScarecrow/neutrino-proxy-server/raw/master/builds/neutrino-server.deb
```
