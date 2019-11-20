CREATE TABLE USER
(
    id                         BIGINT PRIMARY KEY NOT NULL,
    NAME                       VARCHAR(256)          CONSTRAINT FDTEMPL_NAME_NN NOT NULL,
    SURNAME                    VARCHAR(256)          CONSTRAINT FDTEMPL_NAME_NN NOT NULL,
    EMAIL                      VARCHAR(256)          CONSTRAINT FDTEMPL_NAME_NN NOT NULL,
    DATEOFBIRTHDAY             TIMESTAMP NOT NULL,
    SEX                        VARCHAR(256)          CONSTRAINT FDTEMPL_NAME_NN NOT NULL,
);