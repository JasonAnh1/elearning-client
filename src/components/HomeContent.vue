<template>
  <div>
    <div class="">

      <div id="intro-example" class="p-5 text-center bg-image" style="height: 520px;">
        <div>
          <div class="d-flex justify-content-left align-items-left h-100 w-25 ms-5 ps-3">
            <div class="text-dark">
              <h1 class="mb-3 fw-bold">Learn everything you can imagine</h1>
              <h5 class="mb-4">
                Empowering global education without boundaries, providing unlimited teaching opportunities regardless of
                geographical location or subject matter expertise
              </h5>
              <a class="btn btn-primary btn-lg m-2 text-white" href="https://www.youtube.com/watch?v=c9B4TPnak1A"
                role="button" rel="nofollow" target="_blank">Learner</a>
              <a class="btn btn-outline-primary btn-lg m-2" 
                target="_blank" role="button" v-on:click="goLecturePage()">Lecturers</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid ">

      <div class="col-md-10  mx-auto ">

        <div class="container-fluid mt-4 ">
          <div class="elearnexplore">


            <h3 class="fw-bold">Explore </h3>

            <div class="container-fluid">
              <section class="row mt-3">

                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAf6SJYZw4F8s5VdnTLTV-VtG_lpbVPnK_iMlAdzKKjRYIz9gO-uNtK8Cr1yuR-T8ox78&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Data Science</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhYYGRgYGBgYGBwZHRwcHBoYGBgZGRgYGBkcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzErJCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NjQ2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAABAgUGB//EADkQAAECAgYIBQQDAAICAwAAAAEAAgMRBCExUXGRBRJBYYGh0fATFLHB4TJCUmIikvEVggbCM3Ky/8QAGwEAAwEBAQEBAAAAAAAAAAAAAgMEAQAFBgf/xAAtEQACAQIGAgIBAwQDAAAAAAAAAQIDEQQSITFBURNhBRRxIjKBFVKRoULR8P/aAAwDAQACEQMRAD8AKWq5IkltvBfNH27kBbijsIv5qDgtTwXNC5O4Rru5rYdigZZLYduWWAaDTK02GTs5JcxThxki0eO4Gdu4kldlFyTtoNQqK47D6LpQqNJspoVEpWsZask/qYLHC5DVqSvZ6Cxo+/khuohvT3h4lTwnXVIJUExSqtcnNFCcTIVncnYWjGj6nE4dUWjQ3axmA0SqrE8gU4GBFSwkd2r/AJAqV5bJ/wCAbILBY0ZT9VskrWAViHeclXGOVWirfgnb7MBbWgwXZrc0yMXyY5AxO5U8yEyZLTnoD3I4wTBchePTZWA5Lmx6Y4394LpuijHBAiwg+1ne+pX0KcU9UR1al9mcd8UnZNBfruqbIe2JsHErsmA0fgOec5peJQ2OtM+avjJLZEknc8npDRznvl4jJbZfyruGqDPjJKu0S0D6nH/rqjKte18owfaTiashJDeGtsa0cJ8zP1VEa8rWRLKjFu7R4CJQTOQ13bmtmeSEdHv/ABDN7zM5fC9VTo87TwXJivnZXgqVVk0SyiovQ5X/AB0MVve5/wCrTqt4mufCS02K1n/xw2NI2y1nf2fMhMPguOyXMrD6MG1uIG8rtwPJLYQpEd763Oc706JV0O894pmk0pg+n+R31DqeASD3OdaarhUOpWjYxe7BRHAGXyUaFO0/xHP4Uhw/xEkZsJctAnJbIH4uOSiLrM/IcFFmc7L6Peuit2kevos+M24nh1Q2wDdyKIyjOO5fB6n6c1Fck1gftOYCIGC4/wBvhHhaPO/JNs0fitsJlVguRJsIXDn1Rmw8Mk8yg4d8EdtEG098V1hEq8RBkHupNQqPPspxkBo2JhjRcfRboTzr9GKNRmtrNZwqTOuNjVnxWC7iVPMt3eqx1ILdollmk7u5oudhgFjw7yTiVPMjsFTx93JD5YvkyzXARrQK0TWKWEc7loRXd/KONTq4LQ00LWslhEO0gLDqQN5VEc0thcrLcZMRZL93skn0k7Bmh+I87eSaqbYvMh4vG0j1S8WMCZCtBDJ21oraOqKUFGV2LqSbVkCLzhgsEIpYslegmuDz37Mhm5UW7++Cj3yt5oEWkACs9+6NRbAlJIkV0sVyKU1zrXEDcnQ57/pGq293sAo6it+4ucchkOqbBKO4mTctjhRILRbLjWkaRHaLATgKl3qTDA+ljRvlM/2PVcek0JzrSBienVPjJCJU2cSk059gk3KfuVyoz3OtcSvTf8EHWvPBvyrb/wCPsH3OOQTVKICg1weTZBJNQTkKguOzOr5XomaMfPVa0AX2f6ujRtGMb9X8jvsyTLaHOTbszztE0O99TRx+0YuPsCvTaP8A/GoEMTeBEde+towaauJ5LpQYZsAkBd3UmRRiRbJT1JcNjqcbapAWy2NEtlSiN5b9zl8qJf6ew/1dFs0Y64cSmIdAlaQMOwur4O9a8JfLZIn1ksTNiDaMLytiEAnPDCrUG/ILnFWFOs2K6guUkdkkyWKgzeeXRIlFnZ2L+GbysmENpmnPAG8qeELhn7IHRvujvIIFo2Kg03d810Cxouy6qi4bB6D0WRwd3sc61hNsInbkOqK2AN5xRC43eqoB5s5BVRwiXKEyr+mWGS2KFwFpVGCdpzPssmA2/IdZJ8KFNbsVKrN7Ij5YrCKW9lZcN/sqYwjwKlOXIOW5URNW4gIDqV+LQcfhUQpX2RNOtl3YwyHvTDGYnNIimvuYOB9ZqGlPP3ZABFKjN9AxrwXbHXwTKcks54Hx7pZ+s60k4k9VQBG306JkKTiv1MVOtmeisVEfdWbgkg97nEajpDaQR6yCce83nmhmr5T0xVru4IsdbPmoQ68IviblZndLGr1WZrBZbiT4JNpJWW0UDYE93VP4UDDcBz5laqqR3ibExAFyotAs76pow57SURkDu1a8TCPs1YeUhBlHJr9bE1CovdibYwd9UQMU1T5BvRaD6eCW71BNZISCvVRwxUYRJtqS4ylL9Ug5KMdIi8t4UTflWqJ3kQrKzpyWSli915WC515zK876rLvsoaJU1kprG85lVM3nMrlhPZjxXob11WulJLQC36sezPsN8DGtuU19yEAttahdCKCVZs1rC5XqzVhm/mtJUll2Gxd9yg3sqEKOfcl3vN8kMYSka5xiHGCw995A73JR9IG0koDo1wVNPDSYieJikOOitxw6lAfGuAGNqUe598skIvAteM1dDD23IZ4hvYae+dtapuASD6dDFr54JSJpgA/x1QN5mVVGhJ6JE8qsb3bO0pPeuKdM1WTwQnaXmZDKfRM+tLkzzRO/PfzWSN4zXNoznurP8Rut5WLowzw9VLWmoaLVlNKk56vRGgy9bDBsHH/ajkoHK9ZQTxMu7FkMNH8kkbJy3D4WXQwLVovuVBimeIl/7cpjh0Y1rhn0Val6MG92Kj3/AKlvEDFhyg1aDf8APhDfFA2+3ygupZsA9h8pUsRbd2HRw3SHBV32AhvpAG8pJ0Un6jwHRU2ewd70p4tLSC17e4xYW/73/CGvGcdsk1R3Ej3KRaU0x5lLZuTKOJaleTbBrYeMo5YpIY1RerS+qNyiq+9L+0j+jHs8+0M2EjByKzc9/wDZ3VcaFQ4TPoa9v/1e8ctZHaG3P/u8+6+i8b7PnPsLo7LYjh97v7OWxSTtec1xRL8Xf2eP/ZW0j8c3PPq4rPEd9hdHabS/2JzRW6QG48T1XFbL8WZD3RhSANrRgB0QyooZGuztQ6WDYAiGOd+XyvPv0i2+aNRtKEVAVbz8IPB6Gef2dbxNx74q2xO+ykTTift5rJpJNo5+wXeHsF1rbHRdGlaSMTL3QIkVu9JmkM/Jo7uQX0pl5yKKNJdAOs2NPjgbT6Jd9LuGc0NrwbAckUQJ2lMUYx3BzSZz4w1tgyBOZr5pWLDIvNtpn6rutooRBRm3e6Yq0YneJyPMeVcbByCIzRkU7JDe4jkAV6drANneGxar76IZYt8I1YVcs4cHQn5meA9zP2XQgUJjLGjFNlp2mXey9ZlcCeBUtTEya1ZVSw6T0RQA22cuSI14vWGwNpRmQwLh3uXm1q8eWenRoT6La6diI1iwYjReeSyaQdgAXmVMRHg9CFBrcY1Vl0Vo790q57jae8FgtU0qzKI0lyHfSkB0VxsWSAsOckSqy7HKEVsi6se71fJRkMnYfTmUdkEXzw6oYqUjnJIC24DgEdkI7cgihkqqgLuu0qtfYFTDDvkRKquDTIYC2YmSXfEljcl3PJ7sV1HCTlsrLtkdbFwhu7vpDnmBce+KiU1gNozCtV/09dsl/qD6R5MUx/6BbbTH/kzh/i85EhUhv1Q3N/6mWdiyIzxa4jhJfTRi2fLONj1ApTvz5fAScelP/P0C4hjO/I5qNcTUCThX6I1T7BaZ1XxnfkOJQjHAtcOFaWZRHn7XcRLm4hHZo55+2WJ6D3RfpRmVmm0xo2F2MwOSYgaTeDUxgHGeZPsqbot+0tHe8lHZo29xOAn8IJSgGoy4G4Wkp2h0/wBa0cPB/L/tIfKBCojf2PGrIE+idhUN2xkhkOcvRJlKK2GRg3uZazvvojNhgWkDGQ9UVlAO1w4fEk1CoAFcjjUMylSmux0afoFCYL+abYy7vNFhQALJcK0dsK/5yHVIlURTGmxcMPda2Id/fBMthbvb0r5rbId0hgpqmIUUUU8O29wTKOTYM6uVqKKMNpPCQ5mtFbDN5zl6KGEF59TFSe2h6EMNBb6gHQxsMuKFEZK8pzUUDApJVpSKYwhE5hBNgUEErqEhUWE2BIlBy3Y9VbbKxzhBKnhrotop2lEFDFxK5YeT4OddHJ8LsBX5e/vJdkUZo2AYrJYy4HgJZrfqsB4g5PgNuWmQPxAx+T1Tz4YuCpx77sVNL467vJ2/G5NVx9v26/nYWMIfcSTcO5+ipxlYA1VGjS+FyaZpAiYEp3nuZ4Zr1KWAjsl/PJ5tT5FrVu/rgfe8DebkpFp7bNZo3A18V56k0wuqLidwqGQt4paZ21BehSwEI68nmVvlZSdlt6O9F0iwWEuwHVc+LpN7vpk0buvRIa+wDvBMwKM5xsT/ABQhqyV4mpPSOhjx33nJRdaHouodD0VLPJDo21Ts01xu5omu6/16puHRHH7HDEfKONHPu5pbrLsqjhn0cxzJ218FbWbl1maKeeyfRGbog7f/AMlC667Gxw0ujjBhuWmwyu2zRoF+QRm6PG/0S3iEMWHZwW0cnYVsUSdoHFd0UNouzWhDYLkDrhrD9nHZRseARm0XdPHouoJbATkFsMcftzmeiVLELljY4c57KK7cEVtFvrTwgHaZZD5Wm0cd1+qCVYZGj6EgwCwd4hW1nBPOgg35/CoQAlOoH4mKhgRGs3JprJWKFqTNZh0Y2Fiy9ZIxPe9NSCkkl07jlKwrqG5W2BecvhM6qyXtG33WxoX2QMqqW7sZbCAsC3qrDqSNgPGpLR6ULSQE6OHltYRLEwSu2MmKBZXh1Q3RjuHMrmxNIixoc7AVZpd0eI6wBuNZVEcFOW+hDU+WpRdopt+kdZ0QY4ob6QEgyf3EladEa3ZXin08HGPNxFT5KUle1l7CPpBNlfolo9Il9TpbhbkEvSaSTa4gXCocTbzXNjRw24TvlM4K2FCMTy6uNnJ2jqNUmlOLTqNlvNvALzVIpAB/m+ZuFa6hiudZM8vXoiQtHF5/k1vETPNOUowFKE6j1POOp34jPpYmqHRnvM5OM9tcs+hXrqJoQWhoxkB8rrwdGtFpyq5pNTGwWiLKXx8nrY8zQtCylrbdgrK9BRNFACZAaN9ZysCcL2MsAnzSVKpjiZWDn8KXNVqvTRdsvjhqVJXk7vpD/gwBbbtUXG8UXqI/re2H5o9L/B3IVKY6wjCw5I7XAWepXz5mkHp2Dpt7dp41rwo4qPJ9TP42a/az3LYmHNWTgvJ0bT38hrES9N9i7kOlzEw4EG5OjWUtiKphJweqHHQQdpGBQ/LDa48kDzZ7/wBUNKO7JF5rciXh78DLaO2/0Wgxo2d8Un5o3jkoI5vCCVa4SoWHVUkn45v5K/MhLzxC8bHAFEkaaBdn1RIVMDvhaqsW7XMdOS1sNKTQ9dV4iPMgcrCzVcOaGYmKoxO5rM6MysLPBCfEuWXPwWdZOhlauKqZloinTNpPGzKxTVU1lkuTvKkI8N/Zh+J4VJYwRdnX6oznYLBmb+ARRrxXIiWFlJ6owWIZAvTTaMT9uZA5WojaLK0jgCfWSNYlAPBNiQZuS1Kh4TyXXfDun3dJBFD7+AmLEpagPAOWjPPPo7juwtzW4GjdwGPwu+KHvAWm0T9jwEuZWPFOWiZsPj4Q3RzYVAaLeiegsa2wV7q0TUY3fiZob6XsaJ7gELU59j4xhT2SDOeRcMa+QS8ekStdL1XPpNIiTqbLfMdhc5+sfqKqo4RbtoRVxVtEdCPTh9ue1IOpBNpQ3MVCQ3q6NOMSOdSUgvjG7vJUsayiPL6Au+zkyVTRQxx2IjaKdpHqvz1yjHdn6q5pbi2siwY7mmbSR6ZI4oovU8sLgg8yWwLnB6MfgaUmKwJ7xJMimnY1vLouUyDdUjBhvQSxElsySdKnfRHUbTD+vfBU6kOO0Bc8MdeVsA7++KU683yK8UVsNGK78lgvcfu7zQpb1NUXpbqy5bNUUgmqb+SPR47m2Ge4if8AiVbDH5HMdEQQJ/ceXRDGs4u6eoMkmrM6TdJO2t5yVnSJ/Hn8Lnto37HkiNov7O5J6xdV8/6EOnTGvPn8efwr8+bu80sKLvPEjoteU3o1VrS5My00GFKJOxMMcb0k2BK9RzOOPyqaTlvIVPLsh4x2i1wzHtNY8y3ZM4Dqlg3BEYRO1UeRiXBDDIn65n2TMJ53DAdUCFDn81ckwxrRtCOLYDSDNcLz3go56w107ERuHfsnRk3yLasZAPdS1LsdVReMVRetzIyzLcZbB6+qVjPJ+UbUJUdCYBNzszIJ9OSWrFzg3ohAtG2v0WmgmoDgAnWPZ9onw9yh06mMhtm97WN/YgDmqVWzOyVyeVLKrvQRpMJwEyAMelq4sV4E/wDAsaQ/8iYTKG17zfItbzrPAFcGkxor/qLWC4VnP/F6NK6Wuh51WKlLTUPTNJNaazM3fC5dIp8R9QJaLhaeAVmGxlsydpKXe9xmGCU7quad5kL8EmTwztc7i75VpX/in7XNzKiX9mn2H9Wr/ae0ady3NcsRHfkRkteYdfPL2XwMqUuGfpDpM6QRA1ck0hy0ymOG8b0EqMgXRlwdYNWgMVz4ekf1PAzTLdIN35JLpTQmVOa4GAzf6q9RLimzsaeMgr8w64LPFLkDLIY1O5KyALUvruO0KAd1LPH2dlfLGobm3j09U7DYLguW1pRAN6OKy8C5wvszrhu5XUFxuKvWCan6FeF9nX1xccj0WS8/iVzW0iV54lFNLdsAGNabFsF0WhsgnYOJQ3GVrgNwrSbojja4+yzrgbU3NY1Uexl0RosBOJlyCyIrtn8cBL5S7Ys7PcrYf3/iBz9h+NLg6FFeawTmU2xwn06lcptLDRIDP4msu0g7YAEUaiEujKT0O+Ilwz6KHeV500+IfulgAOaA+M42vceKoVW4v60j0kSlMba4YbchWlImlR9rSeQzNfJcOpXrjZWjVQ1UF+Tqvp0QitwaN3uT8JKNpFjb3u39T8rmUmLL6icPhIOiuP0sccGlXUYQavJ6f6Iq05ReWK/7OlSdMRXVNdqD9Lf7H2AXLeGz1nTc69xJOZmVYgRXWMI3kgetfJabo133OGDa+ZqVn28PSVk1/BJ9WvVd2m/yAdSLpDBKvD3H+PfFdUUECxpJvd0sWXw9hPAfCRP5OP8AxKIfGSf7mck0YNreZm4dVBrmpjZDL/V1DAaFhzwLAppY6UiqGChD0IeScfuUT3iO3qkn7FTtDfBT6HPKH8TkVPJu/E5Fek8JV4R7mvD+3Lo9H7cjznkj+LslXkzcV6M0dDNFO5EsS3ugli3ycNtEcisopXV8qdy22jDaVjxKMeIOc2jrYhyvyXTDGqw0XIPsehbrtnMl+vJbAP4roFu4KFt6ZGonwD5fQiGHs9FrwU14jf8AK0N9JAu4lGm3wcpSeyA+WO9DdBlariU24ngEo+lDuSNJjYxm9xlshYrLyk/Mq/MDbMrdQvGwxrtK0GgWAca0AUgXHl1VmkC5LakzcrDkm9VNA8XeFkv3rVBnZBkuWXPSxfj6Kp7hxrTIxSNyBXRd6pr59yWQ7BXro3O2x3jQZsK85V81sSFnM1pbWU1kDm3sZ4xgvVGIEtr48OqouOHNA7vdmqkkMGKgvjHZXyCwrmsSSDyIwQ42ngFTmXLZd2elqrX72I05cGOmmDbRp2rYhNG9Zc+9VrI/1PdmKjFcBdYXKIU1F2VDciPXOKxWrUXnTep46MmawWqKKeQSBvcBWlnU5uwE4DqVFE2lBNaj6cE9yvPXMzIWDTHfi0c1FFXGlDob4432MOpjr/X2WfGduUUTVFIPJFcA4kYoLnuVqI0HFKwJxJ2qq71FEQxEkooosNLmpNRRacWCpWoohMZSiiiw0sOU11FFhxC5ZJUUXGIklQkoouNRc1NY7FFFqOK1VRCiiNGoqatoJUURo17BfKqlFEeVCM7P/9k="
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Business</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo56BcoRLKk_o36qB2VCPVx70mJIfvkHPQYQ&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Computer Science</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCtG8JNI3Yxy1LRCrOM6Eat5bHc_ndZsU1A&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Health</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

              </section>
              <section class="row mt-3">

                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8YSW2BXARcVR6v5BUCKMeVUiBPwEjwnNBIw&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Social Science</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhAYrA8K6wyUsTtFeR9YfuKzy-KSlRy_yxQ&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Arts and Humanities</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaMqR8kBXwyztST6c_PA7ZAytECNoyYaLZGg&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Personal Development</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTtHf8HTC3g5u72CiEznbbRVe1GWpCoCfdw&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Physical Science and Engineering
                            </h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

              </section>
              <section class="row mt-3">

                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQc2UgejW8iXoTUi_hdwMj_aNJMPqNG1kgAg&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Language Learning</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhDa2dZ-J-pxDNwESgURSu2YQknDjWzKTEg&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Math and Logic</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div class="col-md-3">
                  <a href="#" class="text-decoration-none text-dark">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQad0ctiHgatF5xzhrIG5gxCaRM9VwKI4-FnQ&usqp=CAU"
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">Infomation Technology</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>



              </section>

            </div>

          </div>
          <div class="row mt-5">
            <h4 class="fw-bold">Popular for Data Engineers</h4>
            <!-- khoa hoc cho tat ca -->
            <carousel :per-page="perPage" :autoplay="true" :loop="true" :autoplayTimeout="2000">
                <slide v-for="item in courses" v-bind:key="item.id">
                  <div class="card ms-2" style="border: none;">
                    <img :src=item.media.thumbUrl class="card-img-top" alt="..." style="height: 150px;">
                    <div class="card-body">
                      <h5 class="fw-bold" style="font-size: 16px;">
                        {{ item.title }}
                      </h5>
                      <p class="text-muted" style="font-size: 12px;">Jhoe Doe</p>
                      <p class="fw-bold">4.5 <i class="fa-solid fa-star text-warning"></i><i
                          class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i
                          class="fa-solid fa-star text-warning"></i><i
                          class="fa-regular fa-star-half-stroke text-warning"></i><span class="text-muted"
                          style="font-size: 12px;">(123123)</span></p>
                      <p class="fw-bold">đ {{ item.priceSale }}<s class="text-muted fw-light">đ {{ item.price }}</s> <span
                          class="badge bg-info text-dark">Highrate</span></p>

                    </div>
                    <div class="card-footer " style="background-color: white;border: none;">
                      <button class="btn btn-primary w-75" style="background-color: #742feb;border: none;"
                        v-on:click="addCourseToCart(item)">Add to
                        cart</button>
                      <button class="rounded-circle ms-2 px-2 py-1"><i class="fa-regular fa-heart"></i></button>
                    </div>
                  </div>

                </slide>

              </carousel>
            <!-- ket thuc -->
          </div>
          <div class="row mt-5">
            <h4 class="fw-bold">Books<span class="badge bg-secondary"></span></h4>
            <!-- Sach  -->
            <div class="card-group gap-4">
              <div class="card shadow-sm" style="border: none;">
                <img style="height: 230px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6zcRVsB_Ng0BnS2UVm6-fYbzVByRrhECgSw&usqp=CAU"
                  class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="fw-bold " style="font-size: 16px;">Training for Seniors</h5>
                  <p class="text-muted" style="font-size: 12px;">Jhoe Doe</p>
                  <p class="fw-bold">4.5 <i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i
                      class="fa-regular fa-star-half-stroke text-warning"></i><span class="text-muted"
                      style="font-size: 12px;">(123123)</span></p>
                  <p class="fw-bold">$10.99 <s class="text-muted fw-light">$19.99</s></p>

                </div>
                <div class="card-footer" style="background-color: white;border: none;">
                  <button class="btn btn-primary w-75 text-white fw-bold"
                    style="background-color: #3d75ee;border: none;">Add to
                    cart</button>
                  <button class="rounded-circle ms-2 px-2 py-1" style="background-color: white;"><i
                      class="fa-regular fa-heart text-primary"></i></button>
                </div>
              </div>
              <div class="card shadow-sm" style="border: none;">
                <img style="height: 230px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnYhYPdX-BW8HoDbMa8Rajzo4KyFnGpfCDaw&usqp=CAU"
                  class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="fw-bold " style="font-size: 16px;">Black history</h5>
                  <p class="text-muted" style="font-size: 12px;">Jhoe Doe</p>
                  <p class="fw-bold">4.5 <i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i
                      class="fa-regular fa-star-half-stroke text-warning"></i><span class="text-muted"
                      style="font-size: 12px;">(123123)</span></p>
                  <p class="fw-bold">$10.99 <s class="text-muted fw-light">$19.99</s></p>

                </div>
                <div class="card-footer" style="background-color: white;border: none;">
                  <button class="btn btn-primary w-75 text-white fw-bold"
                    style="background-color: #3d75ee;border: none;">Add to
                    cart</button>
                  <button class="rounded-circle ms-2 px-2 py-1" style="background-color: white;"><i
                      class="fa-regular fa-heart text-primary"></i></button>
                </div>
              </div>

              <div class="card shadow-sm" style="border: none;">
                <img style="height: 230px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbZRoL1GBMq1v2WrUvfFve_1_usAI7O-x72A&usqp=CAU"
                  class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="fw-bold " style="font-size: 16px;">Cook for family</h5>
                  <p class="text-muted" style="font-size: 12px;">Jhoe Doe</p>
                  <p class="fw-bold">4.5 <i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i
                      class="fa-regular fa-star-half-stroke text-warning"></i><span class="text-muted"
                      style="font-size: 12px;">(123123)</span></p>
                  <p class="fw-bold">$10.99 <s class="text-muted fw-light">$19.99</s></p>

                </div>
                <div class="card-footer" style="background-color: white;border: none;">
                  <button class="btn btn-primary w-75 text-white fw-bold"
                    style="background-color: #3d75ee;border: none;">Add to
                    cart</button>
                  <button class="rounded-circle ms-2 px-2 py-1" style="background-color: white;"><i
                      class="fa-regular fa-heart text-primary"></i></button>
                </div>
              </div>

              <div class="card shadow-sm" style="border: none;">
                <img style="height: 230px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogbEtIsnf6SFx47n1vF7oFc3M1Zttls0V-A&usqp=CAU"
                  class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="fw-bold " style="font-size: 16px;">New Kid </h5>
                  <p class="text-muted" style="font-size: 12px;">Jhoe Doe</p>
                  <p class="fw-bold">4.5 <i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i
                      class="fa-regular fa-star-half-stroke text-warning"></i><span class="text-muted"
                      style="font-size: 12px;">(123123)</span></p>
                  <p class="fw-bold">$10.99 <s class="text-muted fw-light">$19.99</s></p>

                </div>
                <div class="card-footer" style="background-color: white;border: none;">
                  <button class="btn btn-primary w-75 text-white fw-bold"
                    style="background-color: #3d75ee;border: none;">Add to
                    cart</button>
                  <button class="rounded-circle ms-2 px-2 py-1" style="background-color: white;"><i
                      class="fa-regular fa-heart text-primary"></i></button>
                </div>
              </div>

              <div class="card shadow-sm" style="border: none;">
                <img style="height: 230px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLYe-ZizrlhT8XnGC88nHPOrgvBnuDWq-Ew&usqp=CAU"
                  class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="fw-bold " style="font-size: 16px;">True beauty</h5>
                  <p class="text-muted" style="font-size: 12px;">Jhoe Doe</p>
                  <p class="fw-bold">4.5 <i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i
                      class="fa-solid fa-star text-warning"></i><i
                      class="fa-regular fa-star-half-stroke text-warning"></i><span class="text-muted"
                      style="font-size: 12px;">(123123)</span></p>
                  <p class="fw-bold">$10.99 <s class="text-muted fw-light">$19.99</s></p>

                </div>
                <div class="card-footer" style="background-color: white;border: none;">
                  <button class="btn btn-primary w-75 text-white fw-bold"
                    style="background-color: #3d75ee;border: none;">Add to
                    cart</button>
                  <button class="rounded-circle ms-2 px-2 py-1" style="background-color: white;"><i
                      class="fa-regular fa-heart text-primary"></i></button>
                </div>
              </div>


            </div>
            <!-- ket thuc -->
          </div>
          <div class="row mt-5 container">
            <h4 class="fw-bold">Article</h4>
            <div class="col-8">
              <div class="card mb-3 shadow-sm" style="border: none; ">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src="data:image/jpeg;base64,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"
                      class="img-fluid rounded-start h-100" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title fw-bold">What is Blockchain? </h5>
                      <p class="card-text">A blockchain is a distributed database or ledger shared among a computer
                        network's nodes. </p>
                      <p class="card-text text-muted" style="font-size: 12px;">jhone doe <span class="ms-2"
                          style="color: #dd4b1f;font-size: 13px;">1223 <i class="fa-solid fa-fire"></i></span></p>
                      <p class="card-text"><small class="text-primary" style="font-size: 11px;">Last updated 3 mins
                          ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-3 shadow-sm" style="border: none;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5aoGPtms2s4ywcp_IaXoutrlJlR3q2s7KA&usqp=CAU"
                      class="img-fluid rounded-start h-100" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title fw-bold">Why we should learn python </h5>
                      <p class="card-text">Python is </p>
                      <p class="card-text text-muted" style="font-size: 12px;">jhone doe <span class="ms-2"
                          style="color: #dd4b1f;font-size: 13px;">1223 <i class="fa-solid fa-fire"></i></span></p>
                      <p class="card-text"><small class="text-primary" style="font-size: 11px;">Last updated 3 mins
                          ago</small></p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card mb-3  shadow-sm" style="border: none;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMrAB2Tx2agTys2_L64_Nob8ieW1nsbT0xOw&usqp=CAU"
                      class="img-fluid rounded-start h-100" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title fw-bold">Plan to get abs </h5>
                      <p class="card-text">Finding fast and safe way to get 6pack for everyone. </p>
                      <p class="card-text text-muted" style="font-size: 12px;">jhone doe <span class="ms-2"
                          style="color: #dd4b1f;font-size: 13px;">1223 <i class="fa-solid fa-fire"></i></span></p>
                      <p class="card-text"><small class="text-primary" style="font-size: 11px;">Last updated 3 mins
                          ago</small></p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-4">
              <div class="list-group">
                <h4>Latest Article</h4>
                <a href="#" class="list-group-item list-group-item-action " aria-current="true">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 fw-bold" style="font-size: 16px;">New version of ASP dotnet published</h5>
                    <small class="text-primary" style="font-size: 12px;">3 days ago</small>
                  </div>
                  <p class="mb-1" style="font-size: 14px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati corporis aliqui</p>
                  <small class="text-muted" style="font-size: 12px;">Jhone doe<span class="ms-2"
                      style="color: #dd4b1f;font-size: 13px;">1223 <i class="fa-solid fa-fire"></i></span></small>
                </a>
                <a href="#" class="list-group-item list-group-item-action " aria-current="true">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 fw-bold" style="font-size: 16px;">How chatGPT can improve your productivity</h5>
                    <small class="text-primary" style="font-size: 12px;">3 days ago</small>
                  </div>
                  <p class="mb-1" style="font-size: 14px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati corporis aliqui</p>
                  <small class="text-muted" style="font-size: 12px;">Jhone doe<span class="ms-2"
                      style="color: #dd4b1f;font-size: 13px;">1223 <i class="fa-solid fa-fire"></i></span></small>
                </a>

                <a href="#" class="list-group-item list-group-item-action " aria-current="true">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 fw-bold" style="font-size: 16px;">Best supplyment for your health</h5>
                    <small class="text-primary" style="font-size: 12px;">3 days ago</small>
                  </div>
                  <p class="mb-1" style="font-size: 14px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati corporis aliqui</p>
                  <small class="text-muted" style="font-size: 12px;">Jhone doe<span class="ms-2"
                      style="color: #dd4b1f;font-size: 13px;">1223 <i class="fa-solid fa-fire"></i></span></small>
                </a>

              </div>
            </div>
            <!-- Sach  -->

            <!-- ket thuc -->
          </div>
        </div>

      </div>



    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
  data() {
    return {
      perPage: 4,
      payload: {
                page: 0,
                status: null,
                authorName: null,
                startPrice: 0,
                endPrice: 0,
                categoryId: 0,
                authorId: 0
            }
    }
  },
  computed: {
    courses() {
      return this.$store.state.lstCourse;
    },
    cartItems(){
      return this.$store.state.cart;
    }
  },
  components: {
    Carousel,
    Slide
  },
  name: 'HomeContent',
  props: {
    msg: String
  },
  mounted() {
    this.$store.dispatch('fetchListCourse', this.payload);
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  methods: {
    goLecturePage(){
      if(localStorage.getItem("role") === 'ROLE_LECTURE'){
        this.$router.push({ path: "/LectureStudio" })
      }else{
        this.$swal.fire({
                    icon: 'error',
                    title: 'Oh no',
                    text: 'You are not lecrure!',
                    footer: '<a href="">Go back?</a>'
                });
      }
     
    },
    checkScreenSize() {
      if (window.innerWidth < 1200) {
        this.perPage = 2;
      } else {
        this.perPage = 4;
      }
    },
    addCourseToCart(item) {
      item.type = "COURSE";
      console.log(item)
      // let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      // let itemExists = cartItems.some(cartItem => cartItem.id === item.id);
      let itemExists = this.cartItems.some(cartItem => cartItem.id === item.id);
      if (itemExists) {
        // Nếu mục đã tồn tại trong giỏ hàng, hiển thị thông báo và không thực hiện thêm vào giỏ hàng
        this.$swal.fire({
          icon: 'error',
          title: 'Oh no',
          text: 'This item already in cart!',
          footer: '<a href="">Go to cart?</a>'
        });
      } else {
        // Nếu mục chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng và lưu lại vào localStorage
        this.cartItems.push(item);
        // localStorage.setItem('cartItems', JSON.stringify(cartItems));
        this.$store.dispatch('changeCartItems',this.cartItems)
        // Hiển thị thông báo hoặc thực hiện các hành động khác sau khi thêm vào giỏ hàng
        this.$swal.fire({
          icon: 'success',
          title: 'Yes',
          text: 'Add to cart success!',
          footer: '<a href="">Go to cart?</a>'
        });
      }

    }
  }
}
</script>

<style scoped>
.bg-image {
  background-image: url('~@/assets/banner.jpg');
}
</style>